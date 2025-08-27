const { Router } = require("express")
const router = Router()
const Permissions = require("../../controllers/admins/permissions.controller")
router.get("/",Permissions.index)
router.patch("/",Permissions.update)
module.exports = router