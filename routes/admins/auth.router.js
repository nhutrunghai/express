const { Router } = require("express");
const auth = require("../../controllers/admins/auth.controller");
const router = Router();
router.get("/login", auth.index);
router.post("/login", auth.login);
router.get("/logout", auth.logout);
module.exports = router;
