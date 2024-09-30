const chatSessionModel = require("../models/chatSession-model");
const chatgptController = require("./chatgpt-controller");


const httpCreateSession = async (req, res) => {
  if (!req.body.sessionName || typeof req.body.sessionName !== "string") {
    res.status(500).json({ "Error Message": "Must provide a session name" });
    return -1;
  }
  const result = chatSessionModel.createChatSession(req.body.sessionName)
  res.status(200).json(result);
};

const httpGetSessions = async (req, res) => {
const result = chatSessionModel.getChatSessions();
result.then((result) => {
  res.status(200).json(result);
})
};

const httpGetSessionHistory = async (req, res) => {
  const result = chatSessionModel.getChatSessionChatDetail(req.params.id);
  result.then((result) => {
    res.status(200).json(result);
  })
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
  chatSessionModel.setChatGlobal(req.params.id, req.body.senderID, req.body.message);
  // The HTTP response will be send by chatGPT controller. 
  chatgptController.generateGPTChat(req.params.id, res);
};

const httpForceBotChat = async (req, res) => {
  // The HTTP response will be send by chatGPT controller. 
  chatgptController.generateGPTChat(req.params.id, res);
};

const httpDeleteSession = async (req, res) => {
  const result = chatSessionModel.deleteSession(req.params.id);
  res.status(200).json(result);
}

const httpUpdateSession = async (req, res) => {
  if (!req.body.sessionName || typeof req.body.sessionName !== "string") {
    res.status(500).json({ error: "Must provide a Session Name String" });
    return -1;
  }
  const result = chatSessionModel.updateSession(req.params.id, req.body.sessionName);
  res.status(200).json(result);
}

const httpInsertPersonIntoSession = async (req, res) => {
  const result = await chatSessionModel.insertPerson(req.params.id, req.params.personid);
  res.status(200).json(result);
}

const httpRemovePersonFromSession = async (req, res) => {
  const result = await chatSessionModel.removePerson(req.params.id, req.params.personid);
  res.status(200).json(result);
}

const httpGetPersonsInSession = async (req, res) => {
  const result = await chatSessionModel.getPersons(req.params.id);
  res.status(200).json(result);
}

module.exports = {
  httpCreateSession,
  httpGetSessions,
  httpInsertChat,
  httpForceBotChat,
  httpGetSessionHistory,
  httpDeleteSession,
  httpUpdateSession,
  httpInsertPersonIntoSession,
  httpRemovePersonFromSession,
  httpGetPersonsInSession
};
