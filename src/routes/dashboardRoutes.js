const express = require("express");

const router = express.Router();

const authenticateToken =
  require("../middleware/authMiddleware");

const authorizeRoles =
  require("../middleware/roleMiddleware");

const {
  getDashboardStats
} = require("../controllers/dashboardController");

router.get(
  "/stats",
  authenticateToken,
  authorizeRoles("ADMIN", "MANAGER"),
  getDashboardStats
);

module.exports = router;