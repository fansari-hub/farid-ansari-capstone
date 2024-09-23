const chatgptModel = require("../models/chatgpt-model");
const personalityModel = require("../models/personality-model");
const chatSessionModel = require("../models/chatSession-model");

let personalityData = [];
let chatHistoryData = [];


function generateGPTChat(strSenderID, strMessage, strSessionID) {
  if (!strSenderID && typeof strSenderID !== "string") {
    throw Error("generateGPTChat: You must provide a strSenderID string!");
  }

  if (!strMessage && typeof strMessage !== "string") {
    throw Error("generateGPTChat: You must provide a strMessage string!");
  }

  if (!strSessionID && typeof strSessionID !== "string") {
    throw Error("generateGPTChat: You must provide a strSessionID string!");
  }

  const getData = async () => {
    personalityData = await personalityModel.ChatPersonality.getPersonalityDetails();
    chatHistoryData = await chatSessionModel.ChatSession.getChatSessionChatDetail(strSessionID);
    return true;
  };

  const GPTPersonalityChats = [];

  getData().then(() => {
    let membersPresent = "";
    
    personalityData.forEach((p) =>{
      membersPresent += p.name + ', ';
    })

    personalityData.forEach((p) => {
      let personalChatHistory = [];

      const currentPersonalityName = p.name;
      const systemPrompt = `Your are ${currentPersonalityName}. ${p.conditionPrompt} Individuals present in the meeting are: ${membersPresent.replace(currentPersonalityName, "yourself")}and the user. Please provide responses in first-person as ${currentPersonalityName}. Tags will be used in the data to identify which individual is speaking. Do not include tags in your responses.`;
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
    conversationManager(GPTPersonalityChats, strSessionID);
  });
}

async function conversationManager(gptData, strSessionID) {
  
  const randomPick = Math.floor(Math.random() * 3);
  //console.log(gptData[randomPick]);
  const chatResponse = await chatgptModel.chatSend(gptData[randomPick]);
  console.log(chatResponse);
  const chatToInsert = new chatSessionModel.ChatSession(strSessionID);
  chatToInsert.setChatGlobal(personalityData[randomPick].personalityID, chatResponse.reply);
  //const chatToInsert = new chatSessionModel.ChatSession(strSessionID);
  
  
  //console.log(strSessionID);
  

  // const chatResponse1 = await chatgptModel.chatSend(gptData[1]);
  // console.log(chatResponse1);
  // const chatResponse2 = await chatgptModel.chatSend(gptData[2]);
  // console.log(chatResponse2);
}

// const httpVisonChat = async (req, res) => {
//   const userMessage = req.body.message;
//   const chatResponse = await chatgptModel.chatSend([
//     ...chatHistory,
//     {
//       role: "user",
//       content: [
//         { type: "text", text: userMessage },
//         { type: "image_url", image_url: { url: req.body.imgBase64 } },
//       ],
//     },
//   ]);
//   res.status(200).json(chatResponse);
//   chatHistory.push({
//     role: "user",
//     content: [
//       { type: "text", text: userMessage },
//       { type: "image_url", image_url: { url: req.body.imgBase64 } },
//     ],
//   });
//   chatHistory.push({ role: "assistant", content: chatResponse.reply });
// };

// const httpGenerateTTS = async (_req, res) => {
//   const audioFile = await chatgptModel.textToSpeech(chatHistory[chatHistory.length - 1].content);
//   //res.status(200).sendFile(path.resolve("./public/" + audioFile)); This sends the actual audio file, not URL. Only used for direct testing
//   res.status(200).send({ audioURL: "http://localhost:8080/" + audioFile });
// };

module.exports = {
  generateGPTChat,
  // httpChatSend,
  //httpGenerateTTS,
  //httpVisonChat,
};
