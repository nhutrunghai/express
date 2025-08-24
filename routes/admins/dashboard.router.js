const { Router } = require("express");
const dashboardController = require("../../controllers/admins/dashboard.controller");
const router = Router();
router.get("/", dashboardController.dashboard);
module.exports = router;
