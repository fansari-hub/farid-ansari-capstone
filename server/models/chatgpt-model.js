const axios = require("axios");
require("dotenv").config();


const chatSend = async (tokens, floatTemp = 1) => {
  console.log("****** Sending Request to Open AI*****");
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

module.exports = {
  chatSend,
};
