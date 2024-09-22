const knex = require("knex")(require("../knexfile"));

const { v4: uuidv4 } = require("uuid");

class ChatPersonality {
  static existingSessions = [];

  static async getPersonalityList(){
    let result;
    try{
       result =  await knex.select('personalityID').from('personalities');
    } catch{
      console.log("Could not select from database");
      console.log(error);
    }
    return result;
  }


  constructor(strPersonalityID, strName, strAvatarImg, floatTemperature, strConditionPrompt) {
    if (strPersonalityID && typeof strPersonalityID === "string") {
      this.selectDatabase(strPersonalityID);

    } else {
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

      this.data = {
        name: strName,
        avatarImg: strAvatarImg,
        temperature: floatTemperature,
        conditionPrompt: strConditionPrompt,
        personalityID: uuidv4(),
      };

      this.insertDatabase(this.data);
    }

    return this;
  }

  updatePersonality(updObj) {
    if (typeof updObj !== "object") {
      throw Error("ChatPersonality.updatePersonality: You must provide an update object!");
    }

    if (!updObj.name || typeof updObj.name !== "string") {
      throw Error("ChatPersonality.updatePesonality: You must provide a personality name for the update object");
    }

    if (!updObj.avatarImg || typeof updObj.avatarImg !== "string") {
      throw Error("ChatPersonality.updatePesonality: You must provide an avatarIMG URL string for the update object");
    }

    if (!updObj.temperature || typeof updObj.temperature !== "number") {
      throw Error("ChatPersonality.updatePesonality: You must provide a temperature number between 0.0 and 1.0 update object");
    }

    if (updObj.temperature > 1.0 || updObj.temperature < 0.0) {
      updObj.temperature = 0.5;
    }

    if (!updObj.conditionPrompt || typeof updObj.conditionPrompt !== "string") {
      throw Error("ChatPersonality.updatePesonality: You must provide a condition prompt for the update object");
    }

    this.data.name = updObj.name;
    this.data.avatarImg = updObj.avatarImg;
    this.data.temperature = updObj.temperature;
    this.data.conditionPrompt = updObj.conditionPrompt;

    this.updateDatabase(this.data);
  }

  async insertDatabase(data) {
    try {
      const id = await knex("personalities").insert(data);
    } catch (error) {
      console.log("Could not update database!");
      console.log(error);
    }
  }

  async updateDatabase(data) {
    try {
      const id = await knex("personalities").update(data).where({ personalityID: data.personalityID });
    } catch (error) {
      console.log("Could not update database!");
      console.log(error);
    }
  }

  async selectDatabase(id) {
    let result;
    try {
       result = await knex("personalities").where({personalityID : id});
    } catch (error) {
      console.log("Could not select from database");
      console.log(error);
    }
    this.data = result[0];
  }
}

module.exports = { ChatPersonality };
