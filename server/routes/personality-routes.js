const router = require("express").Router();
const pesonalityController = require("../controllers/personality-controller");
const authorization = require("../middlewares/authorization")
router.use(authorization.decodeToken);

router.route("/")
.post(pesonalityController.httpCreatePersonality)
.get(pesonalityController.httpGetPersonalities);


router.route("/:id")
.put(pesonalityController.httpUpdatePersonality)
.delete(pesonalityController.httpDeletePersonality);

module.exports = router;