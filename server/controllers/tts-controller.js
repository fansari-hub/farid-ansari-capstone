const ttsmodel = require("../models/tts-model");

const httpGenerateTTS = async (req, res) => {
if (!req.body.text || typeof req.body.text !== "string") {
  res.status(500).json({ error: "Must provide a text String" });
  return -1;
}

if (typeof req.body.voice !== "string") {
  res.status(500).json({ error: "Voice can only be a string" });
  return -1;
}

const result = await ttsmodel.textToSpeech(req.body.voice, req.body.text);
res.status(200).send({ result });
};



module.exports = {
    httpGenerateTTS,
  };
  