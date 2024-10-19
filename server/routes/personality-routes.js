const router = require("express").Router();
const pesonalityController = require("../controllers/personality-controller");
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
	delayAfter: 15, // Allow x requests per window
	delayMs: (hits) => hits * 100, // Add 100 ms of delay to every request after the grace count
})


router.use(rateLimiter, speedLimiter, authorization.decodeToken);

router.route("/")
.post(pesonalityController.httpCreatePersonality)
.get(pesonalityController.httpGetPersonalities);


router.route("/:id")
.put(pesonalityController.httpUpdatePersonality)
.delete(pesonalityController.httpDeletePersonality);

module.exports = router;