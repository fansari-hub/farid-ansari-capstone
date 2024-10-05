const router = require("express").Router();
const dallEController = require("../controllers/dalle-controller");
const authorization = require("../middlewares/authorization")
router.use(authorization.decodeToken);

router.route("/avatar/:id")
.post(dallEController.generateAvatar);

module.exports = router;