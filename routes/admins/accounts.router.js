const { Router } = require("express");
const accountController = require("../../controllers/admins/accounts.controller");
const router = Router();
router.get("/", accountController.index);
router.get("/create", accountController.create);
module.exports = router;
