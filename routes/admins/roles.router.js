const {Router} = require("express")
const router = Router();
const Roles = require("../../controllers/admins/roles.controller")
router.get("/",Roles.index)
router.post("/",Roles.createRole)
module.exports = router