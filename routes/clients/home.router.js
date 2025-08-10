const { Router } = require("express");
const homeCotroller = require("../../controllers/clients/home.controller");
const router = Router();
router.get("/", homeCotroller.home);
module.exports = router;
