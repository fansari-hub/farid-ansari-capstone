const chatSession = require("../models/chatSession-model");

let chatSessions = [new chatSession.ChatSession("Default")];

const httpCreateSession = async (req, res) => {
  if (!req.body.name || typeof req.body.name !== "string") {
    res.status(500).json({ "Error Message": "Must provide a session name" });
    return -1;
  }
  newIndex = chatSessions.push(new chatSession.ChatSession(req.body.name));
  res.status(200).json(chatSessions[newIndex - 1].data);
};

const httpGetSessions = async (req, res) => {
  res.status(200).json(chatSessions);
};

const httpInsertChat = async (req, res) => {
  if (!req.body.senderID || typeof req.body.senderID !== "string") {
    res.status(500).json({ error: "Must provide a Sender ID String" });
    return -1;
  }

  if (!req.body.message || typeof req.body.message !== "string") {
    res.status(500).json({ error: "Must provide a message String" });
    return -1;
  }

  const sessionIndex = chatSessions.findIndex((o) => o.data.sessionID === req.params.id);

  if (sessionIndex === -1) {
    res.status(401).json({
      error: "Chat Session ID not found",
    });
    return -1;
  }
  const addedMsg = chatSessions[sessionIndex].setChatGlobal(req.body.senderID, req.body.message);
  res.status(200).json(addedMsg);
};

module.exports = {
  httpCreateSession,
  httpGetSessions,
  httpInsertChat,
};
