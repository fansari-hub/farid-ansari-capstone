const express = require('express');
const cors = require('cors');
const path = require('path');
require("dotenv").config();

const app = express();


//get number of proxies (so rate limiting can work correct when deployed at a web hosting server like Heroku)
if (process.env.NUMBER_OF_PROXIES > 0){
  app.set('trust proxy', process.env.NUMBER_OF_PROXIES)
  console.log(`Number of proxies specified is ${process.env.NUMBER_OF_PROXIES}, applied configuration to Express.`);
}

app.use(express.json({limit: '1024kb'}));
app.use(cors());


const SERVER_LOGGING = true;

// *** Middleware to automatically log server requests ***
app.use((req, res, next) => {
  next();
  if (SERVER_LOGGING) {
    console.log(`Requested METHOD: ${req.method} | ENDPOINT: ${req.originalUrl} | CODE: ${req.res.statusCode} | PAYLOAD: ${req.body}` );
  }
});

const PORT = process.env.PORT || 5050;

const personalityRoutes = require('./routes/personality-routes');
const chatSessionRoutes = require('./routes/chatSession-routes');
const dallERoutes = require('./routes/dalle-routes');
const ttsRoutes = require('./routes/tts-routes');

app.use(express.static("public"));

//for react static builds being server by this express server
app.get('/setup', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//for react static builds being server by this express server
app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'), (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

//endpoint returns the IP address of the IP address (for determining if the correct number of proxies has been configured for trust proxy)
app.get('/myip', (req, res) => {
  res.send(req.ip);
})

app.use('/personality', personalityRoutes);
app.use('/chatsession', chatSessionRoutes);
app.use('/imagegen', dallERoutes);
app.use('/ttsgen', ttsRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});