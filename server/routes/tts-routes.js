const router = require("express").Router();
const ttsController = require("../controllers/tts-controller");
const authorization = require("../middlewares/authorization");
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');


const rateLimiter = rateLimit({
	windowMs: 0.1667 * 60 * 1000, // 10 second window
	limit: 3, // Limit each IP to x requests per window
	standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

const speedLimiter = slowDown({
  windowMs: 1 * 60 * 1000, // 1 minutes window
	delayAfter: 10, // Allow x requests per window
	delayMs: (hits) => hits * 1000, // Add delay to every request after the grace count
})


router.use(rateLimiter, speedLimiter, authorization.decodeToken);

router.route("/")
.post(ttsController.httpGenerateTTS);

router.route("/:id")
.get(ttsController.httpGetSingleAudio);

module.exports = router;