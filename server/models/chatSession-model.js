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

async function createChatSession(strName) {
  if (!strName) {
    console.log("chatSession-model.createChatSession(): Missing session name!");
    return false;
  }
  const data = { sessionID: uuidv4(), sessionName: strName, participants: "[]" };
  const queryResult = knexops.insertDatabase("chatSessions", data); //async op but no need to wait
  return data;
}

async function setChatGlobal(strSession_id, strSenderID, strMessage) {
  if (!strSession_id) {
    console.log("chatSession-model.setChatGlobal(): Missing sessionID!");
    return false;
  }

  if (!strSenderID || !strMessage) {
    console.log("chatSession-model.setChatGlobal(): Missing message!");
    return false;
  }
  const dataObj = {
    sessionID: strSession_id,
    senderID: strSenderID,
    receiverID: "",
    message: strMessage,
    timestamp: Date.now(),
    messageID: uuidv4(),
  };

  const queryResult = await knexops.insertDatabase("chatSessionHist", dataObj); //async ops but no need to wait
  return dataObj;
}

async function deleteSession(strSessionID) {
  if (!strSessionID || typeof strSessionID !== "string") {
    console.log("chatSession-model.deleteSession(): Missing sessionID!");
    return false;
  }
  const queryResult = await knexops.deleteDatabase("chatSessions", { sessionID: strSessionID });
  return queryResult;
}

async function updateSession(strSessionID, strName) {
  if (!strSessionID || typeof strSessionID !== "string") {
    console.log("chatSession-model.updateSession(): Missing sessionID!");
    return false;
  }
  const queryResult = await knexops.updateDatabase("chatSessions", { sessionName: strName }, { sessionID: strSessionID });
  return queryResult;
}

async function insertPerson(strSessionID, strPersonalityID) {
  if (!strSessionID) {
    console.log("chatSession-model.insertPerson(): Missing sessionID!");
    return false;
  }
  if (!strPersonalityID) {
    console.log("chatSession-model.insertPerson(): Missing PersonalityID!");
    return false;
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

  const queryResult2 = await knexops.updateDatabase("chatSessions", { participants: JSON.stringify(personsArray) }, { sessionID: strSessionID });
  return queryResult2;
}

async function removePerson(strSessionID, strPersonalityID) {
  if (!strSessionID) {
    console.log("chatSession-model.removePerson(): Missing sessionID!");
    return false;
  }
  if (!strPersonalityID) {
    console.log("chatSession-model.removePerson(): Missing PersonalityID!");
    return false;
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
      const queryResult = await knexops.updateDatabase("chatSessions", { participants: JSON.stringify(arrayFiltered) }, { sessionID: strSessionID });
      return queryResult;
    }
  }
  return 0;
}

async function getPersons(strSessionID) {
  if (!strSessionID) {
    console.log("chatSession-model.getPersons(): Missing sessionID!");
    return false;
  }

  const queryResult = await knexops.selectDatabase("participants", "chatSessions", { sessionID: strSessionID });
  if (!queryResult[0]) {
    return false;
  }
  return JSON.parse(queryResult[0].participants);
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
