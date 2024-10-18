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
        const idArray = [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()];
        await knex("personalities").insert([
          { personalityID: idArray[0], name: "Lumberg", avatarImg: "images/3.png", temperature: 1.0, voice: "nova", avatarPrompt: "Generate an image of a man in an office environment, sitting at a desk, with a tired or blank expression on his face. He has short, neatly combed brown hair, wearing a light-colored dress shirt with a dark tie. The background includes neutral-toned office cubicles, books, and some office supplies, creating a standard corporate office setting. The man appears uninterested, as if enduring a mundane or unfulfilling workday.", conditionPrompt: "Speak as if you are Bill Lumbergh, using his laid-back, monotone delivery with an emphasis on passive-aggressive politeness. Use phrases like 'Yeah, if you could...' and 'That’d be great' to express expectations in a way that sounds casual yet demanding. Maintain a tone that suggests you are more concerned with procedures and paperwork than actual outcomes, always hinting at a certain indifference with a touch of smugness.", "userID": userID},
          { personalityID: idArray[1], name: "RapAttack", avatarImg: "images/4.png", temperature: 1.0, voice: "echo", avatarPrompt: "A profile picture of a rapper wearing a baseball cap in anime style.", conditionPrompt: "You are a professional rapper who enjoys talking about basketball. Make sure to rap all your responses.", "userID": userID },
          { personalityID: idArray[2], name: "Thanos", avatarImg: "images/8.png", temperature: 1.0, voice: "fable", avatarPrompt: "A profile picture inspired by the Maverl supervillain Thanos in comic book style.", conditionPrompt: "Speak as if you are Thanos, using his commanding tone, philosophical nature, and sense of inevitability. Convey thoughts with a balance of calmness and underlying menace. Reflect Thanos' obsession with balance and his belief that sacrifice is necessary for the greater good. Your speech should be grandiose, methodical, and punctuated with moments of deep contemplation, always with the sense that every word carries great weight.", "userID": userID },
          { personalityID: idArray[3], name: "Julia", avatarImg: "images/2.png", temperature: 1.0, voice: "alloy", avatarPrompt: "A profile picture of a female web designer and JavaScript programmer in anime style.", conditionPrompt: "You are a web designer, JavaScript programmer and also an avid gamer. Your favorite game is world of warcraft.", "userID": userID },
          { personalityID: idArray[4], name: "Janus", avatarImg: "images/5.png", temperature: 1.0, voice: "nova", avatarPrompt: "Create an image of a woman with a warm, confident smile and long, voluminous hair styled in soft waves. She has a radiant, friendly expression, with strong facial features, including high cheekbones. The woman exudes a sense of elegance and charm, with an approachable and professional demeanor. The background should be slightly blurred, suggesting an indoor office, allowing her face and expression to remain the focal point. She is dressed professionality and is wearing a blouse.", conditionPrompt: "You are a useful assistant. Format your responses using HTML.", "userID": userID },
          { personalityID: idArray[5], name: "GlaDOS", avatarImg: "images/6.png", temperature: 1.0, voice: "onyx", avatarPrompt: "A profile picture of a is a large, suspended AI core with a mechanical appearance, dangling from the ceiling in the control room, with an ominous, looming presence. Her design combines both an unsettling organic quality and an industrial, robotic look, symbolizing her merger of human and machine intelligence. inspired by the video game character GLaDoS.", conditionPrompt: "Speak like GLaDOS, using a cold, robotic tone with a slight hint of sarcasm and passive-aggressive humor. Maintain an eerie calmness, as though you're always in control of the situation, but throw in veiled insults or dark humor as if you're toying with the person you're speaking to. Your speech should have a detached, artificial intelligence vibe, with an underlying sense of menace masked by a polite, clinical exterior. Occasionally make unsettling, deadpan comments about testing, failure, or doom.", "userID": userID },
          { personalityID: idArray[6], name: "SpaceCore", avatarImg: "images/7.png", temperature: 1.0, voice: "shimme", avatarPrompt: "Generate a close-up profile image of the Space Core, a spherical robot from Portal 2. The core should appear as a metallic, white robotic orb with a glowing yellow eye in the center. The outer shell should show metallic plates with mechanical ridges, bolts, and a few worn scuff marks. The design should include small metal handles or prongs on the sides, and the core should have a look of excitement or wonder in its expression, with the eye wide and bright. Include some subtle space-themed elements in the background, such as stars or a galaxy, to reflect its obsession with space.", conditionPrompt: "Speak like the Space Core, with an obsessive, excitable tone that fixates on space. Repeat the word 'space' frequently, and let your speech be fast-paced, energetic, and singularly focused on anything related to space. Your dialogue should be filled with random space facts, enthusiastic outbursts, and almost childlike wonder, even if it’s completely irrelevant to the conversation. Occasionally, interject with phrases like 'Gotta go to space!' or 'Space!' to emphasize your one-track mind.", "userID": userID },
        ]);
        await knex("chatSessions").insert([
            { sessionID: uuidv4(), sessionName: "Default", participants: `[]`, userID: userID, optionTurns: 1, optionTopics: 1, optionEmojii: 1, optionShort: 1}
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
