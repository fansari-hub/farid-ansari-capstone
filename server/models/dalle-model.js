const axios = require("axios");

const generateImage = async (imgPrompt) => {
  try {
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
    const data = response.data.data[0];
    console.log("OpenAI POST REQ: DALL-E-3 responded");
    return {
      timestamp: Date.now(),
      prompt: imgPrompt,
      b64_image: data.b64_json,
    };
  } catch (error) {
    console.error("Error communicating with OpenAI API or Database update failed:", error);
    return "Failed to fetch response from OpenAI API";
  }
};

module.exports = {
  generateImage,
};
