const router = require("express").Router();
const ChatSessionController = require("../controllers/chatSession-controller");

router.route("/")
.get(ChatSessionController.httpGetSessions)
.post(ChatSessionController.httpCreateSession);
router.route("/:id")
.post(ChatSessionController.httpInsertChat)
.get(ChatSessionController.httpGetSessionHistory);
router.route("/:id/auto")
.get(ChatSessionController.httpForceBotChat);

module.exports = router;