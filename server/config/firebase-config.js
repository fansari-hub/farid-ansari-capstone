const admin = require("firebase-admin");
const serviceAccount = require("./FireBaseServiceAccount.json");

admin.initializeApp(
  {
  credential: admin.credential.cert(serviceAccount)
  }
);

module.exports = admin;