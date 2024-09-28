const knexops = require("./utils/knexops");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const IMAGE_FILE_BASE = "./public/";
const IMAGE_FILE_PATH = "avatarImg/"

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

  if (typeof strAvatarImg !== "string") {
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

  if (typeof strAvatarImg !== "string") {
    throw Error("ChatPersonality.updatePesonality: You must provide an avatarIMG URL string.");
  }

  if (!floatTemperature || typeof floatTemperature !== "number") {
    throw Error("ChatPersonality.updatePesonality: You must provide a temperature number between 0.0 and 2.0");
  }

  if (floatTemperature > 2.0 || floatTemperature < 0.0) {
    floatTemperature = 1.0;
  }

  if (!strConditionPrompt || typeof strConditionPrompt !== "string") {
    throw Error("ChatPersonality.updatePesonality: You must provide a condition prompt.");
  }
  const data = {
    name: strName,
    avatarImg: strAvatarImg,
    temperature: floatTemperature,
    conditionPrompt: strConditionPrompt,
  };
  knexops.updateDatabase("personalities", data, { personalityID: strPersonalityID });
  return data;
}

function deletePersonality(strPersonalityID) {
  if (!strPersonalityID || typeof strPersonalityID !== "string") {
    throw Error("ChatPersonality.updatePesonality: You must provide a personality ID");
  }
  knexops.deleteDatabase("personalities", { personalityID: strPersonalityID });
}

function updatePersonalityAvatar(strPersonalityID, strAvatarImg) {
  if (!strPersonalityID || typeof strPersonalityID !== "string") {
    throw Error("ChatPersonality.updatePersonalityAvatar: You must provide a personality ID");
  }

  if (!strAvatarImg) {
    throw Error("ChatPersonality.updatePersonalityAvatar: You must provide an image buffer!");
  }

  const filename = uuidv4() + ".png";
  fs.writeFileSync(IMAGE_FILE_BASE + IMAGE_FILE_PATH + filename, strAvatarImg);
  knexops.updateDatabase("personalities", {avatarImg: IMAGE_FILE_PATH + filename}, {personalityID: strPersonalityID});
  return IMAGE_FILE_PATH + filename;
}

module.exports = { getPersonalityList, getPersonalityDetails, createPersonality, updatePersonality, deletePersonality, updatePersonalityAvatar };
