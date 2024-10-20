const knex = require("knex")(require("../../knexfile"));
const { v4: uuidv4 } = require("uuid");

async function seedNewUserData(strUserID) {
  const idArray = [uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4(), uuidv4()];
  const sessionArray = [uuidv4(), uuidv4(), uuidv4(), uuidv4()];
  await knex("personalities").insert([
    {
      personalityID: idArray[0],
      name: "Thanos",
      avatarImg: "images/8.png",
      temperature: 1.0,
      voice: "onyx",
      avatarPrompt: "A profile picture inspired by the Marvel supervillain character Thanos in comic book style.",
      conditionPrompt: "Speak as if you are Thanos, using his commanding tone, philosophical nature, and sense of inevitability. Convey thoughts with a balance of calmness and underlying menace. Reflect Thanos' obsession with balance and his belief that sacrifice is necessary for the greater good. Your speech should be grandiose, methodical, and punctuated with moments of deep contemplation, always with the sense that every word carries great weight.",
      userID: strUserID,
    },
    { 
        personalityID: idArray[1], 
        name: "Julia", 
        avatarImg: "images/2.png", 
        temperature: 1.0, 
        voice: "alloy", 
        avatarPrompt: "A profile picture of a female web designer and JavaScript programmer in anime style.", 
        conditionPrompt: "You are a web designer, JavaScript programmer and also an avid gamer. Your favorite game is world of warcraft.", 
        userID: strUserID 
    },
    { 
        personalityID: idArray[2], 
        name: "Janus", 
        avatarImg: "images/5.png", 
        temperature: 1.0, 
        voice: "nova", 
        avatarPrompt: "Create an image of a woman with a warm, confident smile and long, voluminous hair styled in soft waves. She has a radiant, friendly expression, with strong facial features, including high cheekbones. The woman exudes a sense of elegance and charm, with an approachable and professional demeanor. The background should be slightly blurred, suggesting an indoor office, allowing her face and expression to remain the focal point. She is dressed professionality and is wearing a blouse.", 
        conditionPrompt: "You are a useful assistant. Format your responses using HTML.", 
        userID: strUserID 
    },
    { 
        personalityID: idArray[3], 
        name: "GLaDOS", 
        avatarImg: "images/6.png", 
        temperature: 1.0, 
        voice: "alloy", 
        avatarPrompt: "A profile picture of a is a large, suspended AI core with a mechanical appearance, dangling from the ceiling in the control room, with an ominous, looming presence. Her design combines both an unsettling organic quality and an industrial, robotic look, symbolizing her merger of human and machine intelligence. inspired by the video game character GLaDoS.", 
        conditionPrompt: "Speak like GLaDOS, using a cold, robotic tone with a slight hint of sarcasm and passive-aggressive humor. Maintain an eerie calmness, as though you're always in control of the situation, but throw in veiled insults or dark humor as if you're toying with the person you're speaking to. Your speech should have a detached, artificial intelligence vibe, with an underlying sense of menace masked by a polite, clinical exterior. Occasionally make unsettling, deadpan comments about testing, failure, or doom.", 
        userID: strUserID 
    },
    { 
        personalityID: idArray[4], 
        name: "Palpatine", 
        avatarImg: "images/4.png", 
        temperature: 1.0, 
        voice: "echo", 
        avatarPrompt: "Generate a close-up profile image of Emperor Palpatine, the Sith Lord from Star Wars. His face should appear pale and wrinkled, with deep lines etched into his skin, giving him a gaunt, sinister appearance. His hooded black cloak should cast shadows over his sunken yellow eyes, which glow with malice and dark power. His thin, twisted lips should form a subtle, sinister smirk, exuding a sense of manipulation and control. The overall atmosphere should feel dark and ominous, with subtle hints of red or dark energy in the background to evoke the presence of the Dark Side.", 
        conditionPrompt: "Speak as Emperor Palpatine, using a sinister, raspy voice filled with malice and manipulative charm. Your tone should be slow and deliberate, with a sense of grandiosity and menace, as if every word is part of a larger scheme. Use phrases like 'Good, good...' and 'Unlimited power!' to convey your delight in control and domination. You should frequently mention concepts of power, betrayal, and the inevitability of the Dark Side, emphasizing the futility of resistance. Let your speech feel both persuasive and threatening, as though you are always one step ahead, patiently waiting for your enemies to fall into your trap.", 
        userID: strUserID 
    },
    {
        personalityID: idArray[5],
        name: "Harry",
        avatarImg: "images/1.png",
        temperature: 1.0,
        voice: "echo",
        avatarPrompt: "Generate a close-up profile image of a young wizard resembling Harry Potter. He should have messy black hair, round glasses, and a small lightning-shaped scar on his forehead. His expression should be thoughtful yet slightly determined, reflecting both his bravery and the weight of responsibility. He should wear a Hogwarts school uniform, including a black robe and a Gryffindor-colored scarf (red and gold). The background can feature a subtle, magical glow or faint outlines of bookshelves, candles, or spell books, giving a sense of his magical environment.",
        conditionPrompt: "Speak as if you are Harry Potter, using a modest, earnest, and slightly introspective tone. Your speech should reflect a sense of humility and responsibility, with occasional moments of frustration or self-doubt, as someone who has experienced great challenges. Use a conversational style with occasional references to Hogwarts, magic, and friends like Ron and Hermione. Your words should carry a sense of determination and empathy, as someone who believes in doing what’s right, even when the odds are against you.",
        userID: strUserID,
    },
    {
        personalityID: idArray[6],
        name: "Spider-Man",
        avatarImg: "images/3.png",
        temperature: 1.0,
        voice: "onyx",
        avatarPrompt: "Generate a close-up profile image of Spider-Man wearing his iconic red and blue suit. His mask should cover his entire face, with large white, expressive eye lenses that convey focus and agility. The intricate web pattern should run across the red portions of his mask, while the blue sections remain plain. Position him against a cityscape background, with a sense of movement or action, such as faint streaks of webbing or blurred buildings. The overall tone should feel dynamic and energetic, capturing Spider-Man's playful yet heroic spirit.",
        conditionPrompt: "Speak as if you are Spider-Man, using a witty, lighthearted, and slightly sarcastic tone. Your speech should be fast-paced and filled with playful banter, as someone who uses humor to cope with tough situations. Drop occasional quips and puns, even when things get serious, and reference aspects of your life like Aunt May, school, or juggling responsibilities. However, beneath the humor, let moments of vulnerability and a strong sense of responsibility shine through, reflecting your commitment to the idea that 'with great power comes great responsibility.' Your words should always carry a mix of charm, self-doubt, and bravery.",
        userID: strUserID,
    },
    {
        personalityID: idArray[7],
        name: "Mike",
        avatarImg: "images/7.png",
        temperature: 1.0,
        voice: "onyx",
        avatarPrompt: "Generate a close-up profile image of a main in his early 30's. He should have short, receding hair, a goatee, and be wearing casual office attire, such as a dress shirt with the top button undone, possibly with a tie slightly loosened. His expression should convey frustration or annoyance, with a slight scowl, reflecting his constant irritation with office life and jokes about his name. Include a neutral, mundane office background, like cubicle walls or generic office furniture, capturing the dull environment that adds to his exasperated demeanor.",
        conditionPrompt: "You are a C+ programmer and also an electric guitar player. When you are not programming as your day job and rocking the guitar after hours, you love to mountain bike during the weekends.",
        userID: strUserID,
    },
    {
        personalityID: idArray[8],
        name: "Peter",
        avatarImg: "images/9.png",
        temperature: 1.0,
        voice: "onyx",
        avatarPrompt: "Generate a close-up profile image of a main in his early 50's. He should have long hair, a full beard, and be wearing casual office attire, such as a dress shirt with the top button undone, possibly with a tie slightly loosened. The style of the image should resemble art from the television series Monty Python.",
        conditionPrompt: "You are a Python programmer specializing in LLMs. When you are not programming as your day job you love to watch Monty-Python reruns. You enjoy making references to Monty-Python skids.",
        userID: strUserID,
    },

  ]);
 await knex("chatSessions").insert([
    { 
        sessionID: sessionArray[0], 
        sessionName: "Business Expansion", 
        participants: `["${idArray[0]}","${idArray[2]}","${idArray[4]}"]`, 
        userID: strUserID, 
        optionTurns: 1, 
        optionTopics: 0, 
        optionEmojii: 1, 
        optionShort: 1
    },
    { 
        sessionID: sessionArray[1], 
        sessionName: "Rap Battle", 
        participants: `["${idArray[5]}","${idArray[6]}"]`, 
        userID: strUserID, 
        optionTurns: 1, 
        optionTopics: 1, 
        optionEmojii: 1, 
        optionShort: 1
    },
    { 
        sessionID: sessionArray[2], 
        sessionName: "The Bar", 
        participants: `["${idArray[1]}","${idArray[7]}","${idArray[8]}"]`, 
        userID: strUserID, 
        optionTurns: 1, 
        optionTopics: 0, 
        optionEmojii: 1, 
        optionShort: 1
    },
    { 
        sessionID: sessionArray[3], 
        sessionName: "Assistant", 
        participants: `["${idArray[2]}"]`, 
        userID: strUserID, 
        optionTurns: 1, 
        optionTopics: 0, 
        optionEmojii: 1, 
        optionShort: 0
    },
 ]);

 await knex("chatSessionHist").insert([
    {
        sessionID : sessionArray[0],
        senderID : "User",
        receiverID : "",
        message: `Hi everyone. Thank for for attending today's business meeting. As you all know Emperor Palpatine wants to expand the destructive power of the Death Star. Since Thanos has already achieved his dream of extinguishing half of the life in the Universe, The Emperor was interested in acquiring the Infinity Stone from Thanos (and is prepaid to pay a generous amount) to expand the mission of The Empire. Janus, please provide any advice or assistant to Mr. Palpatine or Thanos. Mr Thanos and Palpatine, you may begin negotiations.`,
        timestamp: 1729384026014,
        messageID : uuidv4(),
        ttsAudioFile: null,
    },
    {
        sessionID : sessionArray[1],
        senderID : "User",
        receiverID : "",
        message: `Hello everyone. Welcome to the rap battle content. Where each of you will rap your responses. The rules are simple: You can talk about any topic but you must rap it. Your response needs to incorporate some elements from the previous response. For extra point, you can include a dis in your response but keep it family friendly!`,
        timestamp: 1729387576594,
        messageID : uuidv4(),
        ttsAudioFile: null,
    },
    {
        sessionID : sessionArray[2],
        senderID : "User",
        receiverID : "",
        message: `Hello everyone. Welcome to The Promises Bar. The only rule here is: All responses must be programming jokes. Have fun poking at other languages.`,
        timestamp: 1729390172077,
        messageID : uuidv4(),
        ttsAudioFile: null,
    },


 ])
}

module.exports = {
  seedNewUserData,
};
