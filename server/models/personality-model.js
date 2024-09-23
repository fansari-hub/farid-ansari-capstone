const knexops = require("./utils/knexops");
const { v4: uuidv4 } = require("uuid");

async function getPersonalityList() {
  const queryResult = await knexops.selectDatabase("personalityID", "personalities");
  return queryResult;
}

async function getPersonalityDetails() {
  const queryResult = await knexops.selectDatabaseAll("personalities");
  return queryResult;
}

function createPersonality(strName, strAvatarImg, floatTemperature, strConditionPrompt) {
  if (!strName || typeof strName !== "string") {
    throw Error("ChatPersonality: You must provide a personality name");
  }

  if (!strAvatarImg || typeof strAvatarImg !== "string") {
    throw Error("ChatPersonality: You must provide an avatarIMG URL string");
  }

  if (!floatTemperature || typeof floatTemperature !== "number") {
    throw Error("ChatPersonality: You must provide a temperature number between 0.0 and 1.0");
  }

  if (floatTemperature > 1.0 || floatTemperature < 0.0) {
    floatTemperature = 0.5;
  }

  if (!strConditionPrompt || typeof strConditionPrompt !== "string") {
    throw Error("ChatPersonality: You must provide a condition prompt");
  }

  const data = {
    name: strName,
    avatarImg: strAvatarImg,
    temperature: floatTemperature,
    conditionPrompt: strConditionPrompt,
    personalityID: uuidv4(),
  };

  knexops.insertDatabase("personalities", data);
  return data;
}

function updatePersonality(strPersonalityID, strName, strAvatarImg, floatTemperature, strConditionPrompt) {

  if (!strPersonalityID || typeof strPersonalityID !== "string") {
    throw Error("ChatPersonality.updatePesonality: You must provide a personality ID");
  }

  if (!strAvatarImg || typeof strAvatarImg !== "string") {
    throw Error("ChatPersonality.updatePesonality: You must provide an avatarIMG URL string for the update object");
  }

  if (!floatTemperature || typeof floatTemperature !== "number") {
    throw Error("ChatPersonality.updatePesonality: You must provide a temperature number between 0.0 and 1.0 update object");
  }

  if (floatTemperature > 1.0 || floatTemperature < 0.0) {
    updObj.temperature = 0.5;
  }

  if (!strConditionPrompt || typeof strConditionPrompt !== "string") {
    throw Error("ChatPersonality.updatePesonality: You must provide a condition prompt for the update object");
  }
  const data = {
  "name" : strName,
  "avatarImg" : strAvatarImg,
  "temperature" : floatTemperature,
  "conditionPrompt" : strConditionPrompt,
  }
  knexops.updateDatabase("personalities", data, { personalityID: strPersonalityID });
  return data;
}


module.exports = { getPersonalityList, getPersonalityDetails, createPersonality, updatePersonality };
