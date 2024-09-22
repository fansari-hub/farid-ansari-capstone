const { v4: uuidv4 } = require("uuid");

class ChatPersonality {
  constructor(strName, strAvatarImg, floatTemperature, strConditionPrompt) {
    this.response = {
      status: 0,
      message: "not set",
    };

    if (!strName || typeof strName !== "string") {
      this.response.status = 500;
      this.response.message = "You must provide string for name!";
      return this.response;
    }

    if (!strAvatarImg || typeof strAvatarImg !== "string") {
      this.response.status = 500;
      this.response.message = "You must provide string URL for avatar!";
      return this.response;
    }

    if (!floatTemperature || typeof floatTemperature !== "number") {
      if (floatTemperature > 1.0 || floatTemperature < 0.0) {
        this.response.status = 500;
        this.response.message = "You must provide numeric values between 0.0 and 1.0 for tempeature!";
        return this.response;
      }
    }

    if (!strConditionPrompt || typeof strConditionPrompt !== "string") {
      this.response.status = 500;
      this.response.message = "You must provide string for Condition Prompt!";
      return this.response;
    }

    this.name = strName;
    this.avatarImg = strAvatarImg;
    this.temperature = floatTemperature;
    this.conditionPrompt = strConditionPrompt;
    this.response.status = 200;
    this.response.message = "Personality Created";
    this.personalityID = uuidv4();

    return this;
  }
}

module.exports = { ChatPersonality };
