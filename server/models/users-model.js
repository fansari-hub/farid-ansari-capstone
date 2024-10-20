const knexops = require("./utils/knexops");
const seedUser = require("./utils/seednewuser");

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
    
      //Seed some data for the user so they don't start with a blank slate.
    if (userID){
      seedUser.seedNewUserData(userID);

    }
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
