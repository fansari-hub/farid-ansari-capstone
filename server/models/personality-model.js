const knexops = require("./utils/knexops");
const { v4: uuidv4 } = require("uuid");
const fs = require("fs");
const IMAGE_FILE_BASE = "./public/";
const IMAGE_FILE_PATH = "avatarImg/"

async function isAuthorized(strPersonalityID, intUserID){
  if (!strPersonalityID || !intUserID) {
    return false;
  }

  const queryResult = await knexops.selectDatabase("personalityID", "personalities", { personalityID: strPersonalityID, userID: intUserID });
  if (queryResult[0]?.personalityID) {
    return true
  } else {
    return false;
  }
}


async function getPersonalityDetails(intUserID) {
  const queryResult = await knexops.selectDatabaseAll("personalities", {userID: intUserID}) ;
  return queryResult;
}

async function createPersonality(strName, strAvatarImg, floatTemperature, strConditionPrompt, strAvatarPrompt, strVoice, intUserID) {
  if (!strName || typeof strName !== "string") {
    console.log("personality-model.createPersonality(): Missing or incorrect type for personality name!");
    return false; 
  }

  if (typeof strAvatarImg !== "string") {
    console.log("personality-model.createPersonality(): AvatarImg is not a string");
    return false; 
  }

  if (!floatTemperature || typeof floatTemperature !== "number") {
    console.log("personality-model.createPersonality(): Missing or incorrect type for temperature!");
    return false; 
  }

  if (floatTemperature > 1.0 || floatTemperature < 0.0) {
    floatTemperature = 1.0;
  }

  if (!strConditionPrompt || typeof strConditionPrompt !== "string") {
    console.log("personality-model.createPersonality(): Missing or incorrect type condition prompt!");
    return false; 
  }

  if (!strAvatarPrompt || typeof strAvatarPrompt !== "string") {
    console.log("personality-model.createPersonality(): Missing or incorrect type for avatar prompt!");
    return false; 
  }

  if (!strVoice || typeof strVoice !== "string") {
    console.log("personality-model.createPersonality(): Missing or incorrect type for voice!");
    return false; 
  }


  const data = {
    name: strName,
    avatarImg: strAvatarImg,
    temperature: floatTemperature,
    conditionPrompt: strConditionPrompt,
    avatarPrompt: strAvatarPrompt,
    voice: strVoice,
    personalityID: uuidv4(),
    userID: intUserID,
  };

  const queryResult  = await knexops.insertDatabase("personalities", data);
  return data;
}

async function updatePersonality(strPersonalityID, strName, strAvatarImg, floatTemperature, strConditionPrompt, strAvatarPrompt, strVoice) {
  if (!strPersonalityID || typeof strPersonalityID !== "string") {
    console.log("personality-model.updatePersonality(): Missing or incorrect type for personalityID!");
    return false; 
  }

  if (typeof strAvatarImg !== "string") {
    console.log("personality-model.updatePersonality(): incorrect type for strAvatarImg!");
    return false; 
  }

  if (!floatTemperature || typeof floatTemperature !== "number") {
    console.log("personality-model.updatePersonality(): incorrect type for temparature!");
    return false; 
  }

  if (floatTemperature > 2.0 || floatTemperature < 0.0) {
    floatTemperature = 1.0;
  }

  if (!strConditionPrompt || typeof strConditionPrompt !== "string") {
    console.log("personality-model.updatePersonality(): missing or incorrect type for condition prompt");
    return false; 
  }

  if (!strAvatarPrompt || typeof strAvatarPrompt !== "string") {
    console.log("personality-model.updatePersonality(): missing or incorrect type for avatar prompt!");
    return false; 
  }

  if (!strVoice || typeof strVoice !== "string") {
    console.log("personality-model.updatePersonality(): missing or incorrect type for voice!");
    return false; 
  }


  const data = {
    name: strName,
    avatarImg: strAvatarImg,
    temperature: floatTemperature,
    conditionPrompt: strConditionPrompt,
    avatarPrompt : strAvatarPrompt,
    voice: strVoice
  };
  const queryResult = await knexops.updateDatabase("personalities", data, { personalityID: strPersonalityID });
  return data;
}

async function deletePersonality(strPersonalityID) {
  if (!strPersonalityID || typeof strPersonalityID !== "string") {
    console.log("personality-model.deletePersonality(): missing or incorrect type for personalityID!");
    return false; 
  }
  const queryResult = await knexops.deleteDatabase("personalities", { personalityID: strPersonalityID });
  return queryResult
}

async function updatePersonalityAvatar(strPersonalityID, strAvatarImg) {
  if (!strPersonalityID || typeof strPersonalityID !== "string") {
    console.log("personality-model.updatePersonalityAvatar(): missing or incorrect type for personalityID!");
    return false; 
  }

  if (!strAvatarImg) {
    console.log("personality-model.updatePersonalityAvatar(): missing image buffer object!");
    return false; 
  }

  const filename = uuidv4() + ".png";
  fs.writeFileSync(IMAGE_FILE_BASE + IMAGE_FILE_PATH + filename, strAvatarImg);
  const queryResult = await knexops.updateDatabase("personalities", {avatarImg: IMAGE_FILE_PATH + filename}, {personalityID: strPersonalityID});
  return IMAGE_FILE_PATH + filename;
}

module.exports = { getPersonalityDetails, createPersonality, updatePersonality, deletePersonality, updatePersonalityAvatar, isAuthorized };
