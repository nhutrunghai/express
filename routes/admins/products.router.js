const { Router } = require('express')
const products = require('../../controllers/admins/products.controller')
const router = Router()
router.get('/',products.products)
module.exports = router