const axios = require("axios");
require("dotenv").config();
const fs = require("fs");
const AUDIO_FILE_PATH = "./public/";


const chatSend = async (tokens) => {
  console.log("****** Sending Request to Open AI*****");
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini", // Use your desired model here
        messages: tokens,
       temperature: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    const chatResponse = response.data.choices[0].message.content;
    console.log("****** OpenAI POST REQ: ChatGPT responded*****");
    console.log("                                              ");

    if (typeof tokens[tokens.length - 1].content === "string") {
   //   console.log("This was a non-vision request.");
    } else {
    //  console.log("This is a vision request, not saving image base64 information in dbase");
    }
    return { reply: chatResponse, timestamp: Date.now() };
  } catch (error) {
    console.error("Error communicating with OpenAI API or Database update failed:", error);
    return "Failed to fetch response from OpenAI API";
  }
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


module.exports = {
  chatSend,
  textToSpeech,
};
