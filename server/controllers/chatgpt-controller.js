const chatgptModel = require("../models/chatgpt-model");

let conditioningPrompt = "You are a helpful assistant. Format response with HTML but only use tags between BODY without including the BODY tag. Incorporate emojis into your responses sparingly.";
let chatHistory = [{ role: "system", content: conditioningPrompt }];

const httpChatSend = async (req, res) => {
  const userMessage = req.body.message;
  const chatResponse = await chatgptModel.chatSend([...chatHistory, { role: "user", content: userMessage }]);
  res.status(200).json(chatResponse);
  chatHistory.push({ role: "user", content: userMessage });
  chatHistory.push({ role: "assistant", content: chatResponse.reply });
};

const httpVisonChat = async (req, res) => {
  const userMessage = req.body.message;
  const chatResponse = await chatgptModel.chatSend([
    ...chatHistory,
    {
      role: "user",
      content: [
        { type: "text", text: userMessage },
        { type: "image_url", image_url: { url: req.body.imgBase64 } },
      ],
    },
  ]);
  res.status(200).json(chatResponse);
  chatHistory.push({
    role: "user",
    content: [
      { type: "text", text: userMessage },
      { type: "image_url", image_url: { url: req.body.imgBase64 } },
    ],
  });
  chatHistory.push({ role: "assistant", content: chatResponse.reply });
};


const httpGenerateTTS = async (_req, res) => {
  const audioFile = await chatgptModel.textToSpeech(chatHistory[chatHistory.length - 1].content);
  //res.status(200).sendFile(path.resolve("./public/" + audioFile)); This sends the actual audio file, not URL. Only used for direct testing
  res.status(200).send({ audioURL: "http://localhost:8080/" + audioFile });
};


module.exports = {
  httpChatSend,
  httpGenerateTTS,
  httpVisonChat,
};