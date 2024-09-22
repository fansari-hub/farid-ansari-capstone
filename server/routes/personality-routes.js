const router = require("express").Router();
const pesonalityController = require("../controllers/personality-controller");

router.route("/")
.post(pesonalityController.httpCreatePersonality)

module.exports = router;