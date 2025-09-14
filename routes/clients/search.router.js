const { Router } = require("express")
const search = require("../../controllers/clients/search.controller")
const router = Router();
router.get("/",search.index)
module.exports = router