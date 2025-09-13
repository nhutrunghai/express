const { Router } = require("express");
const productCotroller = require("../../controllers/clients/product.controller");
const router = Router();
router.get("/", productCotroller.products);
router.get("/:slugCategory", productCotroller.category);
router.get("/detail/:slugProduct",productCotroller.productItem)
module.exports = router;
