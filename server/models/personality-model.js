const { v4: uuidv4 } = require("uuid");

class ChatPersonality {
  constructor(strName, strAvatarImg, floatTemperature, strConditionPrompt) {

    if (!strName || typeof strName !== "string") {
      throw Error("ChatPersonality: You must provide a personality name for the constructor");
    }

    if (!strAvatarImg || typeof strAvatarImg !== "string") {
      throw Error("ChatPersonality: You must provide an avatarIMG URL string for the constructor");
    }

    if (!floatTemperature || typeof floatTemperature !== "number") {
      throw Error("ChatPersonality: You must provide a temperature number between 0.0 and 1.0 for the constructor");
    }

    if (floatTemperature > 1.0 || floatTemperature < 0.0) {    
      floatTemperature = 0.5;
    }

    if (!strConditionPrompt || typeof strConditionPrompt !== "string") {
      throw Error("ChatPersonality: You must provide a condition prompt for the constructor");
    }
    this.data ={
      "name" : strName,
      "avatarImg" : strAvatarImg,
      "temperature" : floatTemperature,
      "conditionPrompt" : strConditionPrompt,
      "personalityID" : uuidv4(),
    }
    return this;
  }

  updatePersonality(updObj) {

    if (typeof updObj !== "object"){
      throw Error("ChatPersonality.updatePersonality: You must provide an update object!");
    }

    if (!updObj.name || typeof updObj.name !== "string") {
      throw Error("ChatPersonality.updatePesonality: You must provide a personality name for the update object");
    }

    if (!updObj.avatarImg || typeof updObj.avatarImg  !== "string") {
      throw Error("ChatPersonality.updatePesonality: You must provide an avatarIMG URL string for the update object");
    }

    if (!updObj.temperature || typeof updObj.temperature !== "number") {
        throw Error("ChatPersonality.updatePesonality: You must provide a temperature number between 0.0 and 1.0 update object");
    }

    if (updObj.temperature> 1.0 || updObj.temperature < 0.0) {    
      updObj.temperature = 0.5;
    }

    if (!updObj.conditionPrompt || typeof updObj.conditionPrompt !== "string") {
      throw Error("ChatPersonality.updatePesonality: You must provide a condition prompt for the update object");
    }

    this.data.name = updObj.name;
    this.data.avatarImg = updObj.avatarImg;
    this.data.temperature = updObj.temperature;
    this.data.conditionPrompt = updObj.conditionPrompt;
  }
}

module.exports = { ChatPersonality };
