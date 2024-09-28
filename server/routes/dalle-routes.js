const router = require("express").Router();
const dallEController = require("../controllers/dalle-controller");

router.route("/avatar/:id")
.post(dallEController.generateAvatar);

module.exports = router;