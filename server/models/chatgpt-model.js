const axios = require("axios");
const knex = require("knex")(require("../knex"));
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const fs = require("fs");
const { time } = require("console");
const AUDIO_FILE_PATH = "./public/";

let sessionID = uuidv4();
updateSessionInfo("event", "Server session started");

const chatSend = async (tokens) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // Use your desired model here
        messages: tokens,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const chatResponse = response.data.choices[0].message.content;
    console.log("OpenAI POST REQ: ChatGPT responded");

    if (typeof tokens[tokens.length - 1].content === "string") {
      console.log("This was a non-vision request.");
      updateSessionInfo("user", tokens[tokens.length - 1].content);
    } else {
      updateSessionInfo("user", tokens[tokens.length - 1].content[0].text);
      console.log("This is a vision request, not saving image base64 information in dbase");
    }
    updateSessionInfo("assistant", chatResponse);
    return { reply: chatResponse, timestamp: Date.now() };
  } catch (error) {
    console.error("Error communicating with OpenAI API or Database update failed:", error);
    return "Failed to fetch response from OpenAI API";
  }
};

const chatReset = () => {
  updateSessionInfo("event", "ChatGPT was reset by user");
  console.log("Reseted ChatGPT.");
};

const getAllChatHistory = async () => {
  let history = await knex("sessionHistory");
  return history;
};

const textToSpeech = async (input) => {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/speech",
      {
        model: "tts-1",
        voice: "alloy",
        input: input,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        responseType: "arraybuffer", //for audio data
      }
    );

    console.log("Received TTS Audio");
    const filename = uuidv4() + ".wav";
    fs.writeFileSync(AUDIO_FILE_PATH + filename, response.data);
    return filename;
  } catch (error) {
    console.error("Error generating speech:", error);
    return "Failed to Generate TTS!";
  }
};

async function updateSessionInfo(role, content) {
  try {
    const id = await knex("sessionHistory").insert({ SessionID: sessionID, role: role, content: content, timestamp: Date.now() });
  } catch (error) {
    console.log("Could not update database with session information!");
    console.log(error);
  }
}

module.exports = {
  chatSend,
  chatReset,
  getAllChatHistory,
  textToSpeech,
};
