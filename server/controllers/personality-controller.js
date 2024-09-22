const chatPersonality = require("../models/personality-model");

const chatPersonalities = [
    new chatPersonality.ChatPersonality("HR Director", "avatar.png", 0.5, "You are an HR Director providing business advice in a board meeting."),
    new chatPersonality.ChatPersonality("CEO", "avatar.png", 0.5, "You are an CEO providing business advice in a board meeting."),
    new chatPersonality.ChatPersonality("IT Director", "avatar.png", 0.5, "You are an IT director business advice in a board meeting.")
  ];

  const httpCreatePersonality = async (req, res) => {
    let newIndex = chatPersonalities.push(
      new chatPersonality.ChatPersonality(
        req.body.name, 
        req.body.avatarImg,
        req.body.temperature,
        req.body.prompt));
        console.log(newIndex);
  
      res.status(chatPersonalities[newIndex-1].response.status)
      .json(chatPersonalities[newIndex-1]);
    }

    module.exports = {
        httpCreatePersonality,
      };