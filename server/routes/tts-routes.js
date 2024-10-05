const router = require("express").Router();
const ttsController = require("../controllers/tts-controller");
const authorization = require("../middlewares/authorization")
router.use(authorization.decodeToken);

router.route("/")
.post(ttsController.httpGenerateTTS);

router.route("/:id")
.get(ttsController.httpGetSingleAudio);

module.exports = router;