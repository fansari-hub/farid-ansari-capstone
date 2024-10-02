const dalleModel = require("../models/dalle-model");
const chatPersonalityModel = require("../models/personality-model");


async function generateAvatar(req, res){
  if (!req.body.prompt || typeof req.body.prompt !== "string") {
    res.status(400).json({ error: "Must provide a Prompt String" });
    return false;
  }
  const avatarPrompt = req.body.prompt;
  const chatResponse = await dalleModel.generateImage(avatarPrompt);
  const imageBuffer = base64ToBlob(chatResponse.b64_image, "image/png")
  const result = chatPersonalityModel.updatePersonalityAvatar(req.params.id, imageBuffer);
  if (result === false){
    res.status(500).json({});
    return false;
  }
  res.status(200).json(result);
}

function base64ToBlob(base64Str){
  const bufferValue = Buffer.from(base64Str, "base64");
return bufferValue;
}

module.exports = {
    generateAvatar,
  };
  