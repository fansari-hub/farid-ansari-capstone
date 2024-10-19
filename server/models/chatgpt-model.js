const chatSessionModel = require("../models/chatSession-model");
const axios = require("axios");
require("dotenv").config();

const chatSend = async (tokens, floatTemp = 1, strSessionID, strPersonalityID) => {
  console.log("****** OpenAI POST REQ: Sendng*****");
  //console.log("***** Temperature: " + floatTemp);
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // Use your desired model here
        messages: tokens,
        temperature: floatTemp,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const chatResponse = response.data.choices[0].message.content;
    console.log("****** OpenAI POST REQ: Received Response*****");

    const result = await chatSessionModel.setChatGlobal(strSessionID, strPersonalityID, chatResponse);

    if (result === false) {
      console.log("chatgpt-model.chatSend() : failed on SetChatGlobal model call");
      return false;
    }
    return result;
  } catch (error) {
    console.error("chatgpt-model.chatSend(): Error communicating with OpenAI API: ", error);
    return false;
  }
};

module.exports = {
  chatSend,
};
