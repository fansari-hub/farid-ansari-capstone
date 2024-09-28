const dalleModel = require("../models/dalle-model");
const chatPersonalityModel = require("../models/personality-model");


async function generateAvatar(req, res){
  if (!req.body.prompt || typeof req.body.prompt !== "string") {
    res.status(500).json({ error: "Must provide a Prompt String" });
    return -1;
  }
  const avatarPrompt = req.body.prompt;
  const chatResponse = await dalleModel.generateImage(avatarPrompt);
  const imageBuffer = base64ToBlob(chatResponse.b64_image, "image/png")
  const updateResult = chatPersonalityModel.updatePersonalityAvatar(req.params.id, imageBuffer);
  res.status(200).json(updateResult);
}

function base64ToBlob(base64Str){
  const bufferValue = Buffer.from(base64Str, "base64");
return bufferValue;
}

module.exports = {
    generateAvatar,
  };
  