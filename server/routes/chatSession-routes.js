const router = require("express").Router();
const ChatSessionController = require("../controllers/chatSession-controller");

router.route("/")
.get(ChatSessionController.httpGetSessions)
.post(ChatSessionController.httpCreateSession);
router.route("/:id")
.post(ChatSessionController.httpInsertChat);

module.exports = router;