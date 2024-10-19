const axios = require("axios");

const generateImage = async (imgPrompt) => {
  try {
    console.log("dalle-model.generateImage(): Sending imagegen request to DALL-E");
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "dall-e-2",
        prompt: imgPrompt,
        n: 1,
        size: "256x256",
        style: "vivid",
        response_format: "b64_json",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log("dalle-model.generateImage(): Response received from DALL-E");
    const data = response.data.data[0];
    console.log("dalle-model.generateImage(): Opened respense from DALL-3");
    return {
      timestamp: Date.now(),
      prompt: imgPrompt,
      b64_image: data.b64_json,
    };
  } catch (error) {
    console.log("dalle-model.generateImage(): Failed to fetch response from OpenAI API with error: ", error);
    return false; 
  }
};

module.exports = {
  generateImage,
};
