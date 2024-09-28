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

//Source code for this function is from https://www.geeksforgeeks.org/how-to-convert-base64-to-blob-in-javascript/
// Function to convert Base64 string to Blob
// function base64ToBlob(base64, contentType = "",
//   sliceSize = 512) {
//   const byteCharacters = atob(base64.split(",")[1]);
//   const byteArrays = [];

//   for (let offset = 0; offset < byteCharacters.length;
//       offset += sliceSize) {
//       const slice = byteCharacters.slice(
//           offset, offset + sliceSize);

//       const byteNumbers = new Array(slice.length);
//       for (let i = 0; i < slice.length; i++) {
//           byteNumbers[i] = slice.charCodeAt(i);
//       }

//       const byteArray = new Uint8Array(byteNumbers);
//       byteArrays.push(byteArray);
//   }

//   const blob = new Blob(byteArrays, { type: contentType });
//   return blob;
// }




module.exports = {
    generateAvatar,
  };
  