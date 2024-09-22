const chatPersonality = require("../models/personality-model");

const chatPersonalities = [];

async function initialize() {
  let personalityList = await chatPersonality.ChatPersonality.getPersonalityList();
  personalityList.forEach((e) => {
    chatPersonalities.push(new chatPersonality.ChatPersonality(e.personalityID));
  });
}

initialize();

const httpCreatePersonality = async (req, res) => {
  if (!req.body.name || typeof req.body.name !== "string") {
    res.status(500).json({ error: "Must provide a name string" });
    return -1;
  }

  if (!req.body.avatarImg || typeof req.body.avatarImg !== "string") {
    res.status(500).json({ error: "Must provide an avatarImg URL string" });
    return -1;
  }

  if (!req.body.temperature || typeof req.body.temperature !== "number") {
    res.status(500).json({ error: "Must provide temperature between 0 and 1" });
    return -1;
  }

  if (!req.body.conditionPrompt || typeof req.body.conditionPrompt !== "string") {
    res.status(500).json({ error: "Must provide an conditionPrompt string" });
    return -1;
  }

  let newIndex = chatPersonalities.push(new chatPersonality.ChatPersonality("", req.body.name, req.body.avatarImg, req.body.temperature, req.body.conditionPrompt));
  res.status(200).json(chatPersonalities[newIndex - 1].data);
};

const httpGetPersonalities = async (req, res) => {
  res.status(200).json(chatPersonalities);
};

const httpUpdatePersonality = async (req, res) => {
  if (!req.body.name || typeof req.body.name !== "string") {
    res.status(500).json({ error: "Must provide a name string" });
    return -1;
  }

  if (!req.body.avatarImg || typeof req.body.avatarImg !== "string") {
    res.status(500).json({ error: "Must provide an avatarImg URL string" });
    return -1;
  }

  if (!req.body.temperature || typeof req.body.temperature !== "number") {
    res.status(500).json({ error: "Must provide temperature between 0 and 1" });
    return -1;
  }

  if (!req.body.conditionPrompt || typeof req.body.conditionPrompt !== "string") {
    res.status(500).json({ error: "Must provide an conditionPrompt string" });
    return -1;
  }

  const personIndex = chatPersonalities.findIndex((o) => o.data.personalityID === req.params.id);
  console.log(chatPersonalities[0].data);
  const updateObj = {
    name: req.body.name,
    avatarImg: req.body.avatarImg,
    temperature: req.body.temperature,
    conditionPrompt: req.body.conditionPrompt,
  };

  if (personIndex === -1) {
    //console.log(req.params.id);
    res.status(401).json({ error: "Personality ID not found" });
    return -1;
  }
  chatPersonalities[personIndex].updatePersonality(updateObj);
  res.status(200).json(chatPersonalities[personIndex].data);
};

module.exports = {
  httpCreatePersonality,
  httpGetPersonalities,
  httpUpdatePersonality,
};
