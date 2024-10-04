const chatSessionModel = require("../models/chatSession-model");
const chatgptController = require("./chatgpt-controller");

const httpCreateSession = async (req, res) => {
  if (!req.body.sessionName || typeof req.body.sessionName !== "string") {
    res.status(400).json({ "Error Message": "Must provide a session name" });
    return false;
  }
  const result = await chatSessionModel.createChatSession(req.body.sessionName, req.body.requestedbyUser);
  if (result === false) {
    res.status(500).json({});
    return false;
  }
  res.status(201).json(result);
};

const httpGetSessions = async (req, res) => {
  const result = await chatSessionModel.getChatSessions();

  if (result === false) {
    res.status(500).json({});
    return false;
  }

  res.status(200).json(result);
};

const httpGetSessionHistory = async (req, res) => {
  const result = await chatSessionModel.getChatSessionChatDetail(req.params.id);

  if (result === false) {
    res.status(500).json({});
    return false;
  }
  res.status(200).json(result);
};

const httpInsertChat = async (req, res) => {
  if (!req.body.senderID || typeof req.body.senderID !== "string") {
    res.status(400).json({ error: "Must provide a Sender ID String" });
    return false;
  }

  if (!req.body.message || typeof req.body.message !== "string") {
    res.status(400).json({ error: "Must provide a message String" });
    return false;
  }
  const result = await chatSessionModel.setChatGlobal(req.params.id, req.body.senderID, req.body.message);

  if (result === false) {
    res.status(500).json({});
    return false;
  }

  await chatgptController.generateGPTChat(req.params.id, res);
  // The HTTP response will be send by chatGPT controller.
  return true;
};

const httpForceBotChat = async (req, res) => {
  // The HTTP response will be send by chatGPT controller.
  await chatgptController.generateGPTChat(req.params.id, res);
  return true;
};

const httpDeleteSession = async (req, res) => {
  const result = await chatSessionModel.deleteSession(req.params.id);
  if (result === false) {
    res.status(500).json({});
    return false;
  }
  res.status(200).json(result);
};

const httpUpdateSession = async (req, res) => {
  if (!req.body.sessionName || typeof req.body.sessionName !== "string") {
    res.status(400).json({ error: "Must provide a Session Name String" });
    return false;
  }
  const result = await chatSessionModel.updateSession(req.params.id, req.body.sessionName);
  if (result === false) {
    res.status(500).json({});
    return false;
  }
  res.status(200).json(result);
};

const httpInsertPersonIntoSession = async (req, res) => {
  const result = await chatSessionModel.insertPerson(req.params.id, req.params.personid);
  if (result === false) {
    res.status(500).json({});
    return false;
  }
  res.status(200).json(result);
};

const httpRemovePersonFromSession = async (req, res) => {
  const result = await chatSessionModel.removePerson(req.params.id, req.params.personid);
  if (result === false) {
    res.status(500).json({});
    return false;
  }
  res.status(200).json(result);
};

const httpGetPersonsInSession = async (req, res) => {
  const result = await chatSessionModel.getPersons(req.params.id);
  if (result === false) {
    res.status(500).json({});
    return false;
  }
  res.status(200).json(result);
};

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
  httpGetPersonsInSession,
};
