const router = require("express").Router();
const pesonalityController = require("../controllers/personality-controller");

router.route("/")
.post(pesonalityController.httpCreatePersonality)
.get(pesonalityController.httpGetPersonalities);


router.route("/:id")
.put(pesonalityController.httpUpdatePersonality)
.delete(pesonalityController.httpDeletePersonality);

module.exports = router;