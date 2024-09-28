const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json({limit: '1024kb'}));
app.use(cors());
require("dotenv").config();

const SERVER_LOGGING = true;

// *** Middleware to automatically log server requests ***
app.use((req, res, next) => {
  next();
  if (SERVER_LOGGING) {
    console.log(`Requested METHOD: ${req.method} | ENDPOINT: ${req.originalUrl} | CODE: ${req.res.statusCode} | PAYLOAD: ${req.body}` );
  }
});

const PORT = process.env.HTTP_PORT || 5050;

//const chatGTPRoutes = require('./routes/chatgpt-routes');
const personalityRoutes = require('./routes/personality-routes');
const chatSessionRoutes = require('./routes/chatSession-routes');
const dallERoutes = require('./routes/dalle-routes');
const ttsRoutes = require('./routes/tts-routes');

app.use(express.static("public"));

//app.use('/chatgpt', chatGTPRoutes);
app.use('/personality', personalityRoutes);
app.use('/chatsession', chatSessionRoutes);
app.use('/imagegen', dallERoutes);
app.use('/ttsgen', ttsRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});