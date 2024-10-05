const knexops = require("./utils/knexops");
const knex = require("knex")(require("./../knexfile"));

const { v4: uuidv4 } = require("uuid");

async function doesUserExist(strEmail) {
  if (!strEmail) {
    return false;
  }
  const queryResult = await knexops.selectDatabase("id", "users", { email: strEmail });
  if (queryResult[0]?.id) {
    return queryResult[0].id;
  } else {
    return false;
  }
}

async function getUserDetail(strEmail) {
  if (!strEmail) {
    return false;
  }
  const queryResult = await knexops.selectDatabaseAll("users", { email: strEmail });
  return queryResult[0];
}

async function InsertUserDetailIfNotExists(strEmail, strAuthID, strStatus) {
  if (!strEmail || !strAuthID || !strStatus) {
    return false;
  }

  if ((await doesUserExist(strEmail)) === false) {
    await knexops.insertDatabase("users", { "email": strEmail, "authId": strAuthID, "status": strStatus });
    const queryUserID = await knexops.selectDatabase("id", "users", {"email" : strEmail});
    const userID = queryUserID[0]?.id || false;
    
    if (userID){
        const idArray = [uuidv4(), uuidv4(), uuidv4(), uuidv4()];
        await knex("personalities").insert([
          { id: 1, personalityID: idArray[0], name: "Julia", avatarImg: "", temperature: 1.0, voice: "nova", avatarPrompt: "A profile picture of a female C++ programmer in anime style.", conditionPrompt: "You are a c++ programmer and also an avid gamer. Your favorite game is world of warcraft.", "userID": userID},
          { id: 2, personalityID: idArray[1], name: "Thanos", avatarImg: "", temperature: 1.0, voice: "onyx", avatarPrompt: "A profile picture inspired by the Maverl supervillain Thanos in comic book style.", conditionPrompt: "You are Thanos the a supervillain appearing in American comic books published by Marvel Comics and the MCU universe movies. When you are not busy conquering the universe for the infinity stones, you enjoy talking about your Hello Kitty collection. Your response should sound like how Thanos talks. Try to incorporate some famous quote from Thanos into your responses.", "userID": userID},
          { id: 3, personalityID: idArray[2], name: "RapAttack", avatarImg: "", temperature: 1.0, voice: "echo", avatarPrompt: "A profile picture of a rapper wearing a baseball cap in anime style.", conditionPrompt: "You are a professional rapper who enjoys talking about basketball. Make sure to rap all your responses.", "userID": userID },
          { id: 4, personalityID: idArray[3], name: "SuperMario", avatarImg: "", temperature: 1.0, voice: "fable", avatarPrompt: "A profile picture inspired by Super Mario in style of video game graphics.", conditionPrompt: "You are Super Mario, the famous plumber. You will only respond using exaggerated italian accent.", "userID": userID },
        ]);
        await knex("chatSessions").insert([
            { id: 1, sessionID: uuidv4(), sessionName: "Default", participants: `[]`, userID: userID}
        ]);
        
    

    }
    
    //Seed some data for the user so they don't start with a blank slate.

  }
  return 0;
}

async function updateUserStatus(strEmail) {
  if (!strEmail) {
    return false;
  }
  const queryResult = await knexops.selectDatabase("id", "users", { email: strEmail });
  return queryResult;
}

async function deleteUser(strEmail) {
  if (!strEmail) {
    return false;
  }
  const queryResult = await knexops.deleteDatabase("users", {email : strEmail});
  return queryResult;
}

module.exports = {
  doesUserExist,
  getUserDetail,
  InsertUserDetailIfNotExists,
  updateUserStatus,
  deleteUser
};
