const { Router } = require('express')
const products = require('../../controllers/admins/products.controller')
const router = Router()
router.get('/',products.products)
router.get('/change-status/:status/:id',products.change)
module.exports = router