const { Router } = require("express");
const ProductsCategoty = require("../../controllers/admins/products-categorys.controller");
const router = Router();
router.get("/", ProductsCategoty.index);
router.patch("/change-multi", ProductsCategoty.changeMulti);
router.patch("/change-status/:status/:id", ProductsCategoty.changeSingle);
module.exports = router;
