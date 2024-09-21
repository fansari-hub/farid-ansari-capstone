const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json({limit: '1024kb'}));
app.use(cors());
require("dotenv").config();

const PORT = process.env.HTTP_PORT || 5050;

const chatGTPRoutes = require('./routes/chatgpt-routes');

app.use(express.static("public"));

app.use('/chatgpt', chatGTPRoutes);

app.listen(PORT, () => {
  console.log(`running at http://localhost:${PORT}`);
});