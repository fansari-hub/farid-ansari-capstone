const chatgptModel = require("../models/chatgpt-model");
const personalityModel = require("../models/personality-model");
const chatSessionModel = require("../models/chatSession-model");

let personalityData = [];
let chatHistoryData = [];

function generateGPTChat(strSessionID, res) {

  if (!strSessionID && typeof strSessionID !== "string") {
    throw Error("generateGPTChat: You must provide a strSessionID string!");
  }

  const getData = async () => {
    personalityData = await personalityModel.getPersonalityDetails();
    chatHistoryData = await chatSessionModel.getChatSessionChatDetail(strSessionID);
    return true;
  };

  const GPTPersonalityChats = [];

  getData().then(() => {
    let membersPresent = "";

    personalityData.forEach((p) => {
      membersPresent += p.name + ", ";
    });

    personalityData.forEach((p) => {
      let personalChatHistory = [];

      const currentPersonalityName = p.name;
      const systemPrompt = `Your are ${currentPersonalityName}. ${p.conditionPrompt} The following individuals are present in a group chat: ${membersPresent.replace(currentPersonalityName, "yourself")} and User. Please provide responses in first-person as ${currentPersonalityName}. <> Tags will be used in the data to identify which individual is speaking. Do not include <> tags in your responses. When speaking to one of the individuals directly, precede their name with the @ symbole. Incorporate Emojis in your responses.`;
      personalChatHistory.push({ role: "system", content: systemPrompt });

      chatHistoryData.forEach((e) => {
        let chatSenderName = "";

        const nameIndex = personalityData.findIndex((o) => o.personalityID === e.senderID);
        if (nameIndex === -1) {
          chatSenderName = "User";
        } else if (personalityData[nameIndex].name === currentPersonalityName) {
          chatSenderName = "You";
        } else {
          chatSenderName = personalityData[nameIndex].name;
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

  personalityData.forEach((e, i) => {
    if (getlastMessage.includes(`@${e.name}`)) {
      directRecipientIndex = i;
    }
  });

  if (directRecipientIndex === -1) {
    randomPick = Math.floor(Math.random() * 3);
  } else {
    randomPick = directRecipientIndex;
  }

  const chatResponse = await chatgptModel.chatSend(gptData[randomPick], personalityData[randomPick].temperature);
  console.log(`****** ${personalityData[randomPick].name} is responding to user ******`);
  //console.log(chatResponse.reply);
  openAIresponse = chatSessionModel.setChatGlobal(strSessionID, personalityData[randomPick].personalityID, chatResponse.reply);
  res.status(200).json(openAIresponse);

}

module.exports = {
  generateGPTChat,
};
