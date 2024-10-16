const knexops = require("./utils/knexops");
const { v4: uuidv4 } = require("uuid");

async function isAuthorized(strSessionID, intUserID){
  if (!strSessionID || !intUserID) {
    return false;
  }
  const queryResult = await knexops.selectDatabase("sessionID", "chatSessions", { sessionID: strSessionID, userID: intUserID });
  if (queryResult[0]?.sessionID) {
    return true
  } else {
    return false;
  }
}

async function getChatSessions(intUserID) {
  const queryResult = await knexops.selectDatabaseAll("chatSessions",{"userID": intUserID});
  return queryResult;
}

async function getChatSessionSingle(strSessionID) {
  const queryResult = await knexops.selectDatabaseAll("chatSessions",{"sessionID": strSessionID});
  return queryResult[0];
}

async function getChatSessionChatDetail(strSessionID) {
  const queryResult = await knexops.selectDatabaseAll("chatSessionHist", { sessionId: strSessionID });
  return queryResult;
}

async function createChatSession(strName, intUserID) {
  if (!strName) {
    console.log("chatSession-model.createChatSession(): Missing session name!");
    return false;
  }
  const data = { sessionID: uuidv4(), sessionName: strName, participants: "[]", userID : intUserID};
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

async function updateSession(strSessionID, strName, boolTurns=true, boolTopics=true, boolEmojii=true, boolShort=false) {
  if (!strSessionID || typeof strSessionID !== "string") {
    console.log("chatSession-model.updateSession(): Missing sessionID!");
    return false;
  }

  if (typeof strName !== "string") {
    console.log("chatSession-model.updateSession(): Bad SessionNamen provided!");
    return false;
  }

  if(typeof boolTurns !=="boolean" || typeof boolTopics !=="boolean" || typeof boolEmojii !=="boolean" || typeof boolShort !=="boolean" ){
    console.log("chatSession-model.updateSession(): Bad option format provided.");
    return false;
  }
  const queryResult = await knexops.updateDatabase("chatSessions", { sessionName: strName, optionTakeTurns : boolTurns, optionTopics: boolTopics, optionEmojii: boolEmojii, optionShort: boolShort }, { sessionID: strSessionID });
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
  isAuthorized,
  getChatSessionSingle
};
