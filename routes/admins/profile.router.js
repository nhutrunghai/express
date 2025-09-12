const { Router } = require("express");
const profileController = require("../../controllers/admins/profile.controller");
const router = Router();
router.get("/", profileController.index);
module.exports = router;
