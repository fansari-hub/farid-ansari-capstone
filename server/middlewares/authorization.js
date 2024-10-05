const admin = require("../config/firebase-config");
const usersModel = require("../models/users-model.js");

class Middleware {
  async decodeToken(req, res, next) {
    if (typeof req.headers.authorization !== "string") {
      console.log("API Authorization failed: No Bearer");
      return res.status(403).json({ message: "Must provide authorization token" });
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (decodeValue) {
        usersModel.InsertUserDetailIfNotExists(decodeValue.email, decodeValue.user_id, "N");
        req.body.requestedbyUser = await usersModel.doesUserExist(decodeValue.email); //Is this efficient / laggy over the internat without local sql?
        return next();
      }
      console.log("API Authorization failed: Did not authorize");
      return res.status(403).json({ message: "Unauthorized" });
    } catch (error) {
      console.log("API Authorization failed: Server Error");
      console.log(error);
      res.status(500).json({ message: "Internal error, possibly could not parse authorization token" });
      return false;
    }
  }
}
module.exports = new Middleware();
