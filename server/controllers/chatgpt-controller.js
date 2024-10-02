const chatgptModel = require("../models/chatgpt-model");
const personalityModel = require("../models/personality-model");
const chatSessionModel = require("../models/chatSession-model");

let personalityData = [];
let personalityDataFiltered = [];
let chatHistoryData = [];
let sessionParticipants = [];

const sessionData = {};

async function generateGPTChat(strSessionID, res) {
  if (!strSessionID && typeof strSessionID !== "string") {
    console.log("Chatgpt-controller.generateGPTChat(): You must provide a strSessionID string!");
    return false;
  }

  personalityData = await personalityModel.getPersonalityDetails();
  chatHistoryData = await chatSessionModel.getChatSessionChatDetail(strSessionID);
  sessionParticipants = await chatSessionModel.getPersons(strSessionID);

  const GPTPersonalityChats = [];

  let membersPresent = "";

  if (sessionParticipants === false) {
    res.status(400).json({ error: "Error getting session participants, did you provide an existing session ID?" });
    return;
  }

  personalityDataFiltered = personalityData.filter((e) => {
    return sessionParticipants.indexOf(e.personalityID) >= 0;
  });

  if (personalityDataFiltered.length === 0) {
    res.status(200).json({});
    return;
  }

  personalityDataFiltered.forEach((p) => {
    membersPresent += p.name + ", ";
  });

  console.log("chatpgtcontroller-generateGPTChat(): members present = ", membersPresent);
  if (chatHistoryData.length > 0) {
    console.log("chatpgtcontroller-generateGPTChat(): last senderID in msg data = " + chatHistoryData[chatHistoryData.length - 1].senderID);
  }

  personalityDataFiltered.forEach((p) => {
    let personalChatHistory = [];

    const currentPersonalityName = p.name;
    const promptInstructions = "Engage with the user and others present, but focus on your own perspective and avoid focusing exclusively on any single individual. Avoid engaging in prolonged one-on-one conversations. Do not adopt the speaking styles of others. When speaking to one of the individuals directly, precede their name with the @ symbole. Incorporate Emojis in your responses only when trying to convoy emotions";
    const systemPrompt = `Your are ${currentPersonalityName}. ${p.conditionPrompt} The following individuals are present in a group chat: ${membersPresent.replace(currentPersonalityName, "yourself")} and User. ${promptInstructions}`;
    personalChatHistory.push({ role: "system", content: systemPrompt });

    chatHistoryData.forEach((e) => {
      let chatSenderName = "";

      const senderIndex = personalityDataFiltered.findIndex((o) => o.personalityID === e.senderID);
      if (senderIndex === -1) {
        chatSenderName = "User";
      } else if (personalityDataFiltered[senderIndex].name === currentPersonalityName) {
        chatSenderName = "You";
      } else {
        chatSenderName = personalityDataFiltered[senderIndex].name;
      }

      if (chatSenderName === "You") {
        personalChatHistory.push({ role: "assistant", content: e.message });
      } else if (chatSenderName === "User") {
        personalChatHistory.push({ role: "user", content: `${e.message}` });
      } else if (chatSenderName !== "You") {
        personalChatHistory.push({ role: "user", content: `${chatSenderName} says: "${e.message}"` });
      }
    });
    GPTPersonalityChats.push(personalChatHistory);
    return true;
  });
  await conversationManager(GPTPersonalityChats, strSessionID, res);
}

async function conversationManager(gptData, strSessionID, res) {
  const MAX_RECENT_SPEAKERS = 2;
  const ONE_IN_X_CHANCE_TO_TALK_AGAIN = 4;

  let recentSpeakers = sessionData[strSessionID]?.recentSpeakers || [];

  // Filter bots that have not spoken recently
  let availableBots = personalityDataFiltered.filter((bot) => !recentSpeakers.includes(bot.personalityID));

  if (availableBots.length === 0) {
    // Reset recentSpeakers if all bots have spoken recently
    recentSpeakers = [];
    availableBots = [...personalityDataFiltered];
    console.log(`chatgpt-controller.conversationManager(): Random choice -> Recent speakers reset...All bots are free to speak again. `);
  }

  let directRecipientIndex = -1;
  const getlastMessage = gptData[0][gptData[0].length - 1].content;

  //  console.log("chatgpt-controller.conversationManager(): available bots : ", availableBots);
  const directRecipientList = availableBots.filter((bot) => getlastMessage.includes(`@${bot.name}`) === true);

  if (directRecipientList.length > 0) {
    directRecipientIndex = Math.floor(Math.random() * directRecipientList.length);
  }
  //console.log("chatgpt-controller.conversationManager(): directRecipientListFiltered contains: ", directRecipientList);
  //console.log("chatgpt-controller.conversationManager(): directRecipientIndex value: ", directRecipientIndex);

  //Select Bots randomly from available bots or based on @ mentions
  let selectedBotIndex;
  let randomPick = 0;

  if (directRecipientIndex !== -1) {
    selectedBotIndex = personalityDataFiltered.findIndex((bot) => bot.personalityID === directRecipientList[directRecipientIndex].personalityID);
    console.log("chatgpt-controller.conversationManager(): @Mention detected with unspoken bots, sending to @recipient: ", personalityDataFiltered[selectedBotIndex].name);
  } else {
    randomPick = Math.floor(Math.random() * availableBots.length);
    selectedBotIndex = personalityDataFiltered.findIndex((bot) => bot.personalityID === availableBots[randomPick].personalityID);
    console.log("chatgpt-controller.conversationManager(): No @mention detected or no more unspoken bot, choosing bot randomly: ", personalityDataFiltered[selectedBotIndex].name);
  }

  //Update recent speakers & remove the oldest entry
  const randomChanceToRegisterSpoken = Math.floor(Math.random() * ONE_IN_X_CHANCE_TO_TALK_AGAIN);

  if (randomChanceToRegisterSpoken !== 0) {
    recentSpeakers.push(personalityDataFiltered[selectedBotIndex].personalityID);
    console.log(`chatgpt-controller.conversationManager(): Random choice -> ${personalityDataFiltered[selectedBotIndex].name} will added to recent speakers `);
  } else {
    console.log(`chatgpt-controller.conversationManager(): Random choice -> ${personalityDataFiltered[selectedBotIndex].name}  not added to recent speakers so might speak again `);
    if (recentSpeakers.length > MAX_RECENT_SPEAKERS - 1) {
      console.log("chatgpt-controller.conversationManager(): Shifted recentSpeakers");
      recentSpeakers.shift();
    }
  }

  if (recentSpeakers.length > MAX_RECENT_SPEAKERS) {
    console.log("chatgpt-controller.conversationManager(): Shifted recentSpeakers");
    recentSpeakers.shift();
  }

  // Set session Data.
  sessionData[strSessionID] = { recentSpeakers };

  console.log(`****** Chat will be sent to ${personalityDataFiltered[selectedBotIndex].name} ******`);
  const openAIresponse = await chatgptModel.chatSend(gptData[selectedBotIndex], personalityDataFiltered[selectedBotIndex].temperature);
  if (openAIresponse === false) {
    res.status(500).json({});
    console.log("chatgpt-controller.conversationManager() : failed on getting response from OpenAI  using chatgptModel");
    return false;
  }

  console.log(`****** ${personalityDataFiltered[selectedBotIndex].name} is responding to user ******`);

  const result = await chatSessionModel.setChatGlobal(strSessionID, personalityDataFiltered[selectedBotIndex].personalityID, openAIresponse.reply);
  
  if (result === false) {
    res.status(500).json({});
    console.log("chatgpt-controller.conversationManager() : failed on SetChatGlobal model call");
    return false;
  }

  console.log("Hello Again, result = " + result);
  res.status(200).json(result);
  return true;
}

module.exports = {
  generateGPTChat,
};
