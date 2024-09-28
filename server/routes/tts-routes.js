const router = require("express").Router();
const ttsController = require("../controllers/tts-controller");

router.route("/")
.post(ttsController.httpGenerateTTS);

router.route("/:id")
.get(ttsController.httpGetSingleAudio);

module.exports = router;