const ttsmodel = require("../models/tts-model");

const httpGenerateTTS = async (req, res) => {
if (!req.body.text || typeof req.body.text !== "string") {
  res.status(401).json({ error: "Must provide a text String" });
  return false;
}

if (!req.body.voice || typeof req.body.voice !== "string") {
  res.status(401).json({ error: "You must provide a voice selectiion in string format. Valid choices are : alloy, echo, fable, onyx, nova, and shimme" });
  return false;
}

if (!req.body.messageID || typeof req.body.messageID !== "string") {
  res.status(401).json({ error: "You must a mesasge ID!" });
  return false;
}
const result = await ttsmodel.textToSpeech(req.body.voice, req.body.text, req.body.messageID);
res.status(200).send({ result });
};

const httpGetSingleAudio = async (req, res) => {
const result = await ttsmodel.getSingleFile(req.params.id);
if (result === false){
  res.status(500).json({});
  return false;
}
res.status(200).send( result );

}



module.exports = {
    httpGenerateTTS,
    httpGetSingleAudio
  };
  