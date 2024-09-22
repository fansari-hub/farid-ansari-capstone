const chatSession = require("../models/chatSession-model");

let chatSessions = [new chatSession.ChatSession("Default")];

const httpCreateSession = async (req, res) => {
  newIndex = chatSessions.push(new chatSession.ChatSession("Additional"));
  res.status(200).json({"sessionID" : chatSessions[newIndex-1].sessionID,"name": chatSessions[newIndex-1].sessionName});
};

const httpGetSessions = async (req, res) => {
  res.status(200).json(chatSessions);
};

const httpInsertChat = async (req, res) => {
  const sessionIndex = chatSessions.findIndex((o) => o.sessionID === req.params.id);
  if (sessionIndex === -1){
    res.status(401).json({});
  }
  chatSessions[sessionIndex].setChatGlobal(
    req.body.senderID,
    req.body.message
  );

  res.status(200).json({"message": "success"});
}


module.exports = {
  httpCreateSession,
  httpGetSessions,
  httpInsertChat
};
