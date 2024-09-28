const ttsmodel = require("../models/tts-model");

const httpGenerateTTS = async (req, res) => {
  console.log(req.body);
if (!req.body.text || typeof req.body.text !== "string") {
  res.status(500).json({ error: "Must provide a text String" });
  return -1;
}

if (!req.body.voice || typeof req.body.voice !== "string") {
  res.status(500).json({ error: "You must provide a voice selectiion in string format. Valid choices are : alloy, echo, fable, onyx, nova, and shimme" });
  return -1;
}
const result = await ttsmodel.textToSpeech(req.body.voice, req.body.text);
res.status(200).send({ result });
};



module.exports = {
    httpGenerateTTS,
  };
  