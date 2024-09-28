const router = require("express").Router();
const ttsController = require("../controllers/tts-controller");

router.route("/")
.get(ttsController.httpGenerateTTS);

module.exports = router;