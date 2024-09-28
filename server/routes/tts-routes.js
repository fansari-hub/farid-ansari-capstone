const router = require("express").Router();
const ttsController = require("../controllers/tts-controller");

router.route("/")
.post(ttsController.httpGenerateTTS);

module.exports = router;