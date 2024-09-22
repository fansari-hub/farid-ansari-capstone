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

  getData().then(() => {
    let chatHistory="" ;
    let senderName;
    chatHistoryData.forEach((e) => {
      const nameIndex = personalityData.findIndex((o) => o.personalityID === e.senderID);
      if (nameIndex === -1) {
        senderName = "User";
      } else {
        senderName = personalityData[nameIndex].name;
      }
      chatHistory += ` ${senderName} said: ${e.message}`
    });

  const systemPrompt = `Your name is ${personalityData[0].name}. ${personalityData[0].conditionPrompt}`;
  const gptData = [
    {"role" : "system", "content": systemPrompt },
    {"role" : "user", "content" : chatHistory}
  ];

  console.log(gptData);

  });

}

// let conditioningPrompt = "You are a helpful assistant. Format response with HTML but only use tags between BODY without including the BODY tag. Incorporate emojis into your responses sparingly.";
// let chatHistory = [{ role: "system", content: conditioningPrompt }];

// const httpChatSend = async (req, res) => {
//   const userMessage = req.body.message;
//   const chatResponse = await chatgptModel.chatSend([...chatHistory, { role: "user", content: userMessage }]);
//   res.status(200).json(chatResponse);
//   chatHistory.push({ role: "user", content: userMessage });
//   chatHistory.push({ role: "assistant", content: chatResponse.reply });
// };

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
