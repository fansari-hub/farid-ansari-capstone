const chatgptModel = require("../models/chatgpt-model");
const personalityModel = require("../models/personality-model");
const chatSessionModel = require("../models/chatSession-model");

let personalityData = [];
let personalityDataFiltered = [];
let chatHistoryData = [];
let sessionParticipants = [];

function generateGPTChat(strSessionID, res) {
  if (!strSessionID && typeof strSessionID !== "string") {
    console.log("Chatgpt-controller.generateGPTChat(): You must provide a strSessionID string!");
    return false
  }

  const getData = async () => {
    personalityData = await personalityModel.getPersonalityDetails();
    chatHistoryData = await chatSessionModel.getChatSessionChatDetail(strSessionID);
    sessionParticipants = await chatSessionModel.getPersons(strSessionID);
    return true;
  };

  const GPTPersonalityChats = [];

  getData().then(() => {
    let membersPresent = "";


    if (sessionParticipants === false){
      res.status(400).json({"error" : "Error getting session participants, did you provide an existing session ID?"});
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

    personalityDataFiltered.forEach((p) => {
      let personalChatHistory = [];

      const currentPersonalityName = p.name;
      const systemPrompt = `Your are ${currentPersonalityName}. ${p.conditionPrompt} The following individuals are present in a group chat: ${membersPresent.replace(currentPersonalityName, "yourself")} and User. Please provide responses in first-person as ${currentPersonalityName}. <> Tags will be used in the data to identify which individual is speaking. Do not include <> tags in your responses. When speaking to one of the individuals directly, precede their name with the @ symbole. Incorporate Emojis in your responses.`;
      personalChatHistory.push({ role: "system", content: systemPrompt });

      chatHistoryData.forEach((e) => {
        let chatSenderName = "";

        const nameIndex = personalityDataFiltered.findIndex((o) => o.personalityID === e.senderID);
        if (nameIndex === -1) {
          chatSenderName = "User";
        } else if (personalityDataFiltered[nameIndex].name === currentPersonalityName) {
          chatSenderName = "You";
        } else {
          chatSenderName = personalityDataFiltered[nameIndex].name;
        }

        if (chatSenderName === "You") {
          personalChatHistory.push({ role: "assistant", content: e.message });
        }

        if (chatSenderName === "User") {
          personalChatHistory.push({ role: "user", content: `<user>${e.message}</user>` });
        } else if (chatSenderName !== "You") {
          personalChatHistory.push({ role: "user", content: `<${chatSenderName}>${e.message}</${chatSenderName}>` });
        }
      });
      GPTPersonalityChats.push(personalChatHistory);
    });
    conversationManager(GPTPersonalityChats, strSessionID, res);
  });
}

async function conversationManager(gptData, strSessionID, res) {
  const getlastMessage = gptData[0][gptData[0].length - 1].content;
  let directRecipientIndex = -1;
  let randomPick = 0;

  personalityDataFiltered.forEach((e, i) => {
    if (getlastMessage.includes(`@${e.name}`)) {
      directRecipientIndex = i;
    }
  });

  if (directRecipientIndex === -1) {
    randomPick = Math.floor(Math.random() * personalityDataFiltered.length);
  } else {
    randomPick = directRecipientIndex;
  }

  console.log(`****** Chat will be sent to ${personalityDataFiltered[randomPick].name} ******`);
  const openAIresponse = await chatgptModel.chatSend(gptData[randomPick], personalityDataFiltered[randomPick].temperature);
  if (openAIresponse === false) {
    res.status(500).json({});
    console.log("chatgpt-controller.conversationManager() : failed on getting response from OpenAI  using chatgptModel");
    return false;
  }

  console.log(`****** ${personalityDataFiltered[randomPick].name} is responding to user ******`);

  const result = chatSessionModel.setChatGlobal(strSessionID, personalityDataFiltered[randomPick].personalityID, openAIresponse.reply);
  if (result === false) {
    res.status(500).json({});
    console.log("chatgpt-controller.conversationManager() : failed on SetChatGlobal model call");
    return false;
  }
  res.status(200).json(result);
}

module.exports = {
  generateGPTChat,
};
