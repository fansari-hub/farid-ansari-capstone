const knexops = require("./utils/knexops");
const { v4: uuidv4 } = require("uuid");

async function getChatSessions() {
  const queryResult = await knexops.selectDatabaseAll("chatSessions");
  return queryResult;
}

async function getChatSessionChatDetail(strSessionID) {
  const queryResult = await knexops.selectDatabaseAll("chatSessionHist", { sessionId: strSessionID });
  return queryResult;
}

function createChatSession(strName) {
  if (!strName) {
    throw Error("ChatSession: You must provide a session name!");
  }
  const data = { sessionID: uuidv4(), sessionName: strName,};
  knexops.insertDatabase("chatSessions", data); //async op but no need to wait
  return data;
}

function setChatGlobal(strSession_id, strSenderID, strMessage) {
  if (!strSession_id) {
    throw Error("ChatSession.getCurrentSessionChat: You must provide a session ID!");
  }

  if (!strSenderID || !strMessage) {
    throw Error("ChatSession.setChatglobal: You must provide SenderID and Message");
  }
  const dataObj = {
    sessionID: strSession_id,
    senderID: strSenderID,
    receiverID: "",
    message: strMessage,
    timestamp: Date.now(),
    messageID: uuidv4(),
  };

  knexops.insertDatabase("chatSessionHist", dataObj); //async ops but no need to wait
  return dataObj;
}


module.exports = { getChatSessions, getChatSessionChatDetail, createChatSession, setChatGlobal };
