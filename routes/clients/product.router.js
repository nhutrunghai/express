const { Router } = require("express");
const productCotroller = require("../../controllers/clients/product.controller");
const router = Router();
router.get("/", productCotroller.product);
router.get("/:slugCategory", productCotroller.category);
module.exports = router;
