const router = require("express").Router();
const chatgptController = require("../controllers/chatgpt-controller");

router.route("/")
.post(chatgptController.httpChatSend)
.delete(chatgptController.httpChatReset)
.get(chatgptController.httpChatHistory);

router.route("/tts")
.post(chatgptController.httpGenerateTTS);

router.route("/vision")
.post(chatgptController.httpVisonChat);

module.exports = router;