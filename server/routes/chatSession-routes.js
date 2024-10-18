const router = require("express").Router();
const ChatSessionController = require("../controllers/chatSession-controller");
const authorization = require("../middlewares/authorization")
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');


const rateLimiter = rateLimit({
	windowMs: 0.1667 * 60 * 1000, // 10 second window
	limit: 15, // Limit each IP to x requests per window
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000, // 1 minute window
	delayAfter: 25, // Allow x requests per window
	delayMs: (hits) => hits * 100, // Add 100 ms of delay to every request after the grace count
})

router.use(rateLimiter, speedLimiter, authorization.decodeToken);

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