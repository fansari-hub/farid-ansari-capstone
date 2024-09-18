const router = require("express").Router();
const rootController = require("../controllers/root-controller");

router.route("/")
.get(rootController.getFun)
.post(rootController.postFun)
.delete(rootController.delFun)
.patch(rootController.patchFun);

module.exports = router;
