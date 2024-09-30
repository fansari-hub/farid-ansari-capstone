const knex = require("knex");
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
  const data = { sessionID: uuidv4(), sessionName: strName };
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

function deleteSession(strSessionID) {
  if (!strSessionID || typeof strSessionID !== "string") {
    throw Error("ChatSession.deleteSession: You must provide a Session ID");
  }
  const result = knexops.deleteDatabase("chatSessions", { sessionID: strSessionID });
  return result;
}

function updateSession(strSessionID, strName) {
  if (!strSessionID || typeof strSessionID !== "string") {
    throw Error("ChatSession.updateSession: You must provide a Session ID");
  }
  const result = knexops.updateDatabase("chatSessions", { sessionName: strName }, { sessionID: strSessionID });
  return result;
}

async function insertPerson(strSessionID, strPersonalityID) {
  if (!strSessionID) {
    throw Error("ChatSession.getCurrentSessionChat: You must provide a session ID!");
  }
  if (!strPersonalityID) {
    throw Error("ChatSession.setChatglobal: You must provide PersonalityID");
  }

  const queryResult = await getPersons(strSessionID);
  let personsArray = [];

  if (queryResult) {
    personsArray = queryResult;
    const exitingRecordIndex = personsArray.indexOf(strPersonalityID);
    if (exitingRecordIndex === -1) {
      personsArray.push(strPersonalityID);
  //    console.log("Add Person to existing Array");
    }
  } else {
    personsArray.push(strPersonalityID);
   // console.log("Add Person to new Array");
  }

  const result = await knexops.updateDatabase("chatSessions", { participants: JSON.stringify(personsArray) }, { sessionID: strSessionID });
  return result;
}

async function removePerson(strSessionID, strPersonalityID) {
  if (!strSessionID) {
    throw Error("ChatSession.getCurrentSessionChat: You must provide a session ID!");
  }
  if (!strPersonalityID) {
    throw Error("ChatSession.setChatglobal: You must provide PersonalityID");
  }

  const queryResult = await getPersons(strSessionID);
  let personsArray = [];
  let arrayFiltered = [];

  if (queryResult) {
    personsArray = queryResult;
    const exitingRecordIndex = personsArray.indexOf(strPersonalityID);
    if (exitingRecordIndex > -1) {
      arrayFiltered = personsArray.filter((e) => {
        return e !== strPersonalityID;
      });
      //console.log("Removed PersonID from Array");
      const result = await knexops.updateDatabase("chatSessions", { participants: JSON.stringify(arrayFiltered) }, { sessionID: strSessionID });
      return result;
    }
  }
  return 0;
}
async function getPersons(strSessionID) {
  if (!strSessionID) {
    throw Error("ChatSession.getCurrentSessionChat: You must provide a session ID!");
  }

  const result = await knexops.selectDatabase("participants", "chatSessions", { sessionID: strSessionID });
  return JSON.parse(result[0].participants);
}

module.exports = {
  getChatSessions,
  getChatSessionChatDetail,
  createChatSession,
  setChatGlobal,
  deleteSession,
  updateSession,
  insertPerson,
  removePerson,
  getPersons,
};
