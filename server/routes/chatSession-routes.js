const router = require("express").Router();
const ChatSessionController = require("../controllers/chatSession-controller");

router.route("/")
.get(ChatSessionController.httpGetSessions)
.post(ChatSessionController.httpCreateSession);
router.route("/:id")
.post(ChatSessionController.httpInsertChat)
.get(ChatSessionController.httpGetSessionHistory)
.delete(ChatSessionController.httpDeleteSession)
.put(ChatSessionController.httpUpdateSession);
router.route("/:id/auto")
.get(ChatSessionController.httpForceBotChat);
router.route("/:id/participant")
.get(ChatSessionController.httpGetPersonsInSession)
router.route("/:id/participant/:personid")
.post(ChatSessionController.httpInsertPersonIntoSession)
.delete(ChatSessionController.httpRemovePersonFromSession);

module.exports = router;