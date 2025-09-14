const { Router } = require("express")
const cartController = require("../../controllers/clients/cart.controller")
const router = Router()
router.post("/add",cartController.addCart)
module.exports = router