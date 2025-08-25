const { Router } = require("express")
const router = Router()
const settings = require("../../controllers/admins/settings.controller")
router.get("/",settings.index);
module.exports = router