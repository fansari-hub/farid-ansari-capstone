const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json({limit: '1024kb'}));
app.use(cors());
require("dotenv").config();

const PORT = process.env.HTTP_PORT || 5050;

//const chatGTPRoutes = require('./routes/chatgpt-routes');
const personalityRoutes = require('./routes/personality-routes');
const chatSessionRoutes = require('./routes/chatSession-routes');

app.use(express.static("public"));

//app.use('/chatgpt', chatGTPRoutes);
app.use('/personality', personalityRoutes);
app.use('/chatsession', chatSessionRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});