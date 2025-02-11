# Janus GPT
![screenshot](./janus-logo2.webp)

## OCT 22 - *** Submission Notes ****
Please note that I have left the original project proposal (see further below the document) and have updated this document with new information at the top. 

## About JanusGPT

Did you ever wonder what Thanos and Emperor Palpatine would discuss over a business lunch? 
How about a rap battle between Harry Potter and Spider-Man?

Now you can!.....with JanusGPT

Talk to multiple AI personas at the same time. 
Powered by OpenAI.



## Release Features

* Chat with one or more AI personas at the same time.
* AI personas can talk to each other.
* Create & customize your own personas, including generating their avatar images.
* Multiple chat sessions active at the same time.
* Add / Remove personas from chat sessions
* Each logged-in user will have their own chat sessions and personas.
* Text-to-Speech support.
* Mobile and Desktop support with responsive design.


## Tech Stack

* Front-end: React
* Back-end: Node.js
* Data storage: MySQL
* Deployment: Heroku

## Used Libraries -- Front-end
* Axios
* Firebase-auth
* React-router-dom

 
## Used Libraries -- Back-end
* Axios
* Cors
* Dotenv
* Express
* Express-rate-limit
* Express-slow-down
* Firebase-admin
* Knex
* Mysql2
* Uuid

## API Information

* Internal (Back-end) APIs:  17 total routes (release routes are different than the proposal)
* External API - OpenAI: Chat Completion (gpt-4o-mini model), DALL-E and  Speech APIs
* Firebase Auth: Admin and Authentication APIs

## API Security

All Back-End API endpoints:
* Perform user authentication before processing.
* Perform user authorization against data before responding where relevant.
* Have basic protection against repeated request attempts by enforcing rate limits and slow-downs.


## Project Deployment Notes

To Deploy, you need additional setup (I will provide more information via slack to BrainStation staff)
* Server: .env file (will include my own private OpenAI API key). To be placed inside the server folder.
* Server: FireBaseServiceAccount.json (will include my private Firebase admin keys). To be placed inside server/config folder.

To Run:
1) Server: Please migrate the database using "npm run migrate" in the server folder.
2) Execute "npm run start" in server folder.
3) Execute "npm run start" in client folder.

## Known issues & missing features
* User will get a 500 server error after session tokens expires due to inactivity (the application currently only refreshes session tokens when a back-end API call is made). To fix, simply navigate between pages to refresh the token or simply refresh the page. (I will fix this in the future.) 
* For manual password/email login, email verification and password reset is not implemented yet, but you can still sign up using manual email/password and use the application. It would have taken too long to implement these futures (everything has to be done manually even in FireBase), but I am planning to implement these in the near future.


## Database Migration
You will only have to migrate the database, seeding is done automatically by the back-end each time a new user is created. 

## Instructions on how to use the application
![screenshot](./instruction1.png)

A. Login to the application (preferred method is using Google or GitHub for convinence)

B. Choose an existing chat session by clicking on the chat session name (see #2 in screenshot). You may also create new sessions by clicking "New Session", or delete existing sessions and change existing session names by using the control buttons next to each session name.

C. Once a chat session is "opened", you may start chatting with the bots (there should already be some personas in the chat if you are using one of the seed sessions). Here's a description of the chat controls (see #3 in screenshot) :
* Send: Sends the text that you typed and gets back a persona/bot reply.
* Pass: Don't say anything but let the personas/bots reply or say something instead.
* TTS toggle: Enabling this will result in text-to-speeck playback after persona reply has been received (might take a few seconds).
* Auto toggle: Personas will automatically chat with each other without user input randomly.

D. Session option: You can adjust chat session "options" by setting the following toggles (#4 in screenshot:
* Take Turns (If ON, it forces personas to take turns, with a small random chance they can speak out of turn)
* Switch Topic (If ON, personas will automatically switch discussion topic after a while).
* Emojiis: (If ON, personas will use emojiis, this might not work if you toggle it mid-chat due to LLM learning behaviour)
* Short Reply (If ON, personas will use short reply instead of longer one, his might not work if you toggle it mid-chat due to LLM learning behaviour)

E. Add or Remove personas from the current session by using the + or - buttons in the "persona bar" (see #1 in the screen shot).

F. To customize/add/delete personas, click on the "Personalities" link (see #5 in the screenshot). Once on that page, you may:
* Add a new persona by clicking "Add New Slot" at the bottom of the page.
* Delete existing personas
* Edit information on existing persona (don't forget to press Save):
  * Change/enter their name.
  Set "Temperature" which controls the persona creativity level from deterministic to most creative/random.
  * Prompt sets the behaviour/conditioning prompt.
  * TTS voice sets the voice for Text-to-speech.

G. To generate image for a persona, first enter the image generation prompt (next to the profile picture) & press save (to optionally save your profile picture prompt text). Once you are happy with the prompt, press on "Generate Image" and wait 1-10 seconds. The page will refresh when once profile avatar is generated.




# ORIGINAL PROJECT PROPOSAL

## Overview

Janus GPT: One AI, Multiple Perspectives -- Experience the power of multiple AI perspectives in one seamless chat!

### Problem

ChatGPT currently interacts with users using one AI "personality" at a time, based on an assistant "conditioning" prompt. If a user wants the ChatGPT to change its personality or "creativity temperature," they must either start a new chat session with a different conditioning prompt or ask the AI to change its personality mid-conversation, which can feel unnatural. 

"Janus GPT" solves this issue by allowing users to engage with multiple ChatGPT personalities simultaneously, acting as a conversation "director." These ChatGPT personalities can also interact with one another, providing a broader perspective on the same question asked by the user. This setup also has the potential to create hilarious, meme-worthy LLM conversations.

### User Profile

Individuals who want to experiment with LLMs and go beyond OpenAI's standard ChatGPT can use Janus GPT to seek advice from the LLM by getting broader "perspectives" simultaneously.

###  Features

* Ability to chat with one or more LLM "personalities" at the same time.
* User can send messages to all personalities or send a messsage to a single personality using @username.
* A LLM Personality "profile" page where the user can provide a conditioning prompt and other parameters. The LLM can also generate its own "avatar" image based on the provided conditioning prompt.

## Implementation

### Tech Stack

* React
* Node.JS
* MySQL or SqlLite
* Client Libs:
    - Axios
    - SASS
    - React
    - React-router
* Server Libs:
    - Axios
    - CORS
    - dotenv
    - express
    - Knex
    - mysql2
    - uuid

### APIs

* OpenAI Endpoints: 
        - POST - https://api.openai.com/v1/chat/completions (ChatGPT replies, also used for "AI VISION")
        - POST - https://api.openai.com/v1/audio/speech (Text to speech)


### Sitemap

* A homepage where the user interacts with the LLM.
* A profile page to configure the LLM personalities.


### Data

* The database will simply be used to store conversation history that can be recalled later by the user on the frontend. There will most likely be one or two tables to store the information. This is only needed if the "historical conversation with tabs" stretch goal (see nice-to-haves) is implemented. 

### Endpoints

#### router.route("/")
.post(chatgptController.httpChatSend) : Accepts user text input and returns ChatGPT response from openAI.

.delete(chatgptController.httpChatReset): Forces the LLM to "Forget the current confirmation", basically resetting "state" by deleting previous tokens. 

.get(chatgptController.httpChatHistory): Return all historical conversation saved in the server database accross all previous sessions. This endpoint will be used for one of the "nice to have" strech goals.

#### router.route("/tts")
.post(chatgptController.httpGenerateTTS); Takes last text output provided by chatGPT and returns an audio file from OpenAI (wav) to the front-end. This is a strech goal.

#### router.route("/vision")
.post(chatgptController.httpVisonChat); Accept user text input and a "base-64" string representation of a image uploaded by the front-end and returns the OpenAI response. This is a strech goal.


### Research on Technical Risk / Unknown

Based on research, it is possible to give the LLM multiple "personalities" that are presented as different "AIs" to the user within the same chat. One of the key features of an LLM is that it has no persistent memory or state, therefore in order to create the illusion of an ongoing "conversation," previous chats need to be appended to each new request (combining old tokens with new tokens).

This stateless nature can be leveraged to introduce "multiple personalities" within the LLM, thus allowing the user to interact with different "personalities" at the same time. The server can achieve this by manipulating the token history and adjusting how the conversation history is presented to each LLM "personality." Even though the same OpenAI endpoint and API key are being used, each personality can be distinct in how it processes and responds.

Additionally, the server can moderate the conversation by deciding whether a specific LLM personality should respond and by introducing random response delays for each personality. This helps create a more natural and dynamic conversation experience.


Here's an example of how this can be achieved, let's assume we have two AI "personalities" called Bob and Alice:

The user inputs:
    "How is everyone doing?"

The server sends the following data to Open AI and waits for a response:
    {"role":"system, "content": "You are an useful assitant. You are named Bob. [INSERT BOB PERSONALITY PROMPT HERE]"}
    {“role”:“user”,“content”:“How is everyone doing”}

Open AI "Bob" responds with:
🌟 Hello everyone! How's it going? Hope you're all having a fantastic day!

So now we have a response from "Bob." The server knows this because it inserted the name "Bob" into the system prompt, so it expects the reply to be from "Bob." Now the server can randomly choose whether it should stop here or generate an LLM request to "Alice." Let's assume the server chooses to send a message to Alice; it would look something like this:
    
    {"role":"system, "content": "You are an useful assitant. You are named Alice. [INSERT ALICE PERSONALITY PROMPT HERE]"}
    {“role”:“user”,“content”:“I said: How is everyone doing, Bob said: 🌟 Hello everyone! How's it going? Hope you're all having a fantastic day! 😊. Is there anything you also want to say?”}

Open AI "Alice" responds with:
    🌈 Hi Bob and everyone! I'm doing great, thanks for asking! 🌞 I hope you're all enjoying your day as well! If anyone has fun plans for the weekend, I'd love to hear about them! 🎉

The user inputs:
    "That's great everyone. I can't wait for the weekend!"

The server randomly decides to only send this data to "Alice" :

    {"role":"system, "content": "You are an useful assitant. You are named Alice. [INSERT ALICE PERSONALITY PROMPT HERE]"}
    {“role”:“user”,“content”:“I said: How is everyone doing, Bob said: 🌟 Hello everyone! How's it going? Hope you're all having a fantastic day! 😊.”}
    {“role”:“assitant”,“content”:“🌈 Hi Bob and everyone! I'm doing great, thanks for asking! 🌞 I hope you're all enjoying your day as well! If anyone has fun plans for the weekend, I'd love to hear about them! 🎉”}
    {“role”:“user”,“content”:“I say: That's great everyone. I can't wait for the weekend!”}

Open AI "Alice" responds with:
    🎉 I know, right? The weekend is the perfect time to relax and have some fun! 🌟 Do you have any special plans for it? Maybe some adventures or just a cozy time at home? 🏖️😊

Without user input, the server randomly sends the following data to Bob:

    {"role":"system, "content": "You are an useful assitant. You are named Bob. [INSERT BOB PERSONALITY PROMPT HERE]"}
    {“role”:“user”,“content”:“I said: How is everyone doing, Bob said: 🌟 Hello everyone! How's it going? Hope you're all having a fantastic day! 😊.”}
    {“role”:“assitant”,“content”:“🌈 Hi Bob and everyone! I'm doing great, thanks for asking! 🌞 I hope you're all enjoying your day as well! If anyone has fun plans for the weekend, I'd love to hear about them! 🎉”}
    {“role”:“user”,“content”:“I say: That's great everyone. I can't wait for the weekend! Alice said:  🎉 I know, right? The weekend is the perfect time to relax and have some fun! 🌟 Do you have any special plans for it? Maybe some adventures or just a cozy time at home? 🏖️😊. Is there anything you also like to say?”}

Open AI "Bob" respones with:
    🌼 I'm really looking forward to the weekend too! I love the idea of both adventures and cozy time. Maybe a little bit of both? 🥳 I'm thinking about going for a hike if the weather is nice! What about everyone else? 🌳✨


### Auth

The application will not require authentication. However a paid open-AI developper API key will be required (which is configured in source code) for the functionality. 

## Roadmap

- Create client (will use existing functionality developed during research as starter-code).
- Create server (will use existing functionality developed during research as starter-code).
- Create db migrations.
- Create nice SASS/CSS.
- Bug fixes.
- Demo DAY.


## Nice-to-haves
* Text to speech support
* Ability to use AI vision where the LLM is used to describe an image uploaded by the user.
* Ability for the user to "load" previous historical conversations, organized by tabs
