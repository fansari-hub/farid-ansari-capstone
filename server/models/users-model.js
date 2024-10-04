const knexops = require("./utils/knexops");

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

  if (await doesUserExist(strEmail) === false) {
    const queryResult = await knexops.insertDatabase("users", { email: strEmail, authId: strAuthID, status: strStatus });
    return queryResult;
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

module.exports = {
  doesUserExist,
  getUserDetail,
  InsertUserDetailIfNotExists,
  updateUserStatus,
};
