const axios = require("axios");
require("dotenv").config();
const knexops = require("./utils/knexops");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const AUDIO_FILE_BASE = "./public/";
const AUDIO_FILE_PATH = "TTS/"


const textToSpeech = async (voice , input, messageID) => {
  console.log("tts-model.textToSpeech() : Requesting TTS from OpenAI.");

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/audio/speech",
      {
        model: "tts-1",
        voice: voice,
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

    console.log("tts-model.textToSpeech() : Received TTS AUDIO from OpenAI.");
    const filename = uuidv4() + ".wav";
    console.log("tts-model.textToSpeech() : File will be saved as: ", AUDIO_FILE_PATH + filename);
    const fileOpsResult = fs.writeFileSync(AUDIO_FILE_BASE +  AUDIO_FILE_PATH + filename, response.data);
    console.log("tts-model.textToSpeech() : File save opearing ended with result: ", fileOpsResult);
    if(typeof messageID === "string"){
      knexops.updateDatabase("chatSessionHist", {ttsAudioFile: AUDIO_FILE_PATH + filename}, {messageID: messageID});
    }
    return AUDIO_FILE_PATH + filename;
  } catch (error) {
    console.log("tts-model.textToSpeech(): Failed to fetch response from OpenAI API with error: ", error);
    return false; 
  }
};

const getSingleFile = async (messageID) => {
  if(typeof messageID === "string"){
    const queryResult = await knexops.selectDatabase("ttsAudioFile", "chatSessionHist", {messageID: messageID});
    return queryResult[0];
  }

}

module.exports = {
  textToSpeech,
  getSingleFile
};
