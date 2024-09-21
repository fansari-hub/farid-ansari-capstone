# Janus GPT
![screenshot](./janus-logo2.webp)

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

router.route("/")
.post(chatgptController.httpChatSend) : Accepts user text input and returns ChatGPT response from openAI.
.delete(chatgptController.httpChatReset): Forces the LLM to "Forget the current confirmation", basically resetting "state" by deleting previous tokens. 
.get(chatgptController.httpChatHistory): Return all historical conversation saved in the server database accross all previous sessions. This endpoint will be used for one of the "nice to have" strech goals.

router.route("/tts")
.post(chatgptController.httpGenerateTTS); Takes last text output provided by chatGPT and returns an audio file from OpenAI (wav) to the front-end. This is a strech goal.

router.route("/vision")
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
