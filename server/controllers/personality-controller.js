const chatPersonalityModel = require("../models/personality-model");

const httpCreatePersonality = async (req, res) => {
  if (!req.body.name || typeof req.body.name !== "string") {
    res.status(400).json({ error: "Must provide a name string" });
    return false;
  }

  if (typeof req.body.avatarImg !== "string") {
    res.status(400).json({ error: "Must provide an avatarImg URL string" });
    return false;
  }

  if (!req.body.temperature || typeof req.body.temperature !== "number") {
    res.status(400).json({ error: "Must provide temperature between 0 and 1" });
    return false;
  }

  if (!req.body.conditionPrompt || typeof req.body.conditionPrompt !== "string") {
    res.status(400).json({ error: "Must provide an conditionPrompt string" });
    return false;
  }

  if (!req.body.avatarPrompt || typeof req.body.avatarPrompt !== "string") {
    res.status(400).json({ error: "Must provide an avatarPrompt string" });
    return false;
  }

  if (!req.body.voice || typeof req.body.voice !== "string") {
    res.status(400).json({ error: "Must provide an voice string" });
    return false;
  }

  const result = await chatPersonalityModel.createPersonality(req.body.name, req.body.avatarImg, req.body.temperature, req.body.conditionPrompt, req.body.avatarPrompt, req.body.voice, req.body.requestedbyUser);
  if (result === false) {
    res.status(500).json({});
    return false;
  }
  res.status(201).json(result);
};

const httpGetPersonalities = async (req, res) => {
  const result = await chatPersonalityModel.getPersonalityDetails();

  if (result === false) {
    res.status(500).json({});
    return false;
  }
  res.status(200).json(result);
};

const httpUpdatePersonality = async (req, res) => {
  if (!req.body.name || typeof req.body.name !== "string") {
    res.status(400).json({ error: "Must provide a name string" });
    return false;
  }

  if (typeof req.body.avatarImg !== "string") {
    res.status(400).json({ error: "Must provide an avatarImg URL string" });
    return false;
  }

  if (!req.body.temperature || typeof req.body.temperature !== "number") {
    res.status(400).json({ error: "Must provide temperature between 0 and 1" });
    return false;
  }

  if (!req.body.conditionPrompt || typeof req.body.conditionPrompt !== "string") {
    res.status(400).json({ error: "Must provide an conditionPrompt string" });
    return false;
  }

  if (!req.body.avatarPrompt || typeof req.body.avatarPrompt !== "string") {
    res.status(400).json({ error: "Must provide an avatarPrompt string" });
    return false;
  }

  if (!req.body.voice || typeof req.body.voice !== "string") {
    res.status(400).json({ error: "Must provide a voice string" });
    return false;
  }

  const result = await chatPersonalityModel.updatePersonality(req.params.id, req.body.name, req.body.avatarImg, req.body.temperature, req.body.conditionPrompt, req.body.avatarPrompt, req.body.voice);
  if (result === false) {
    res.status(500).json({});
    return false;
  }
  res.status(200).json(result);
};

const httpDeletePersonality = async (req, res) => {
  const result = await chatPersonalityModel.deletePersonality(req.params.id);
  if (result === false) {
    res.status(500).json({});
    return false;
  }
  res.status(200).json(result);
};

module.exports = {
  httpCreatePersonality,
  httpGetPersonalities,
  httpUpdatePersonality,
  httpDeletePersonality,
};
