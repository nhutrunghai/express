const { Router } = require("express");
const cartController = require("../../controllers/clients/cart.controller");
const router = Router();
router.post("/add", cartController.addCart);
router.get("/", cartController.index);
router.delete("/delete/:id", cartController.delete);
module.exports = router;
