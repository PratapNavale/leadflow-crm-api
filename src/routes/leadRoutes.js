const express = require("express");

const router = express.Router();

const authenticateToken = require("../middleware/authMiddleware");

const {
  createLead,
  getAllLeads,
  getLeadById,
  updateLead,
  deleteLead
} = require("../controllers/leadController");

router.post(
  "/",
  authenticateToken,
  createLead
);

router.get(
  "/",
  authenticateToken,
  getAllLeads
);

router.get(
  "/:id",
  authenticateToken,
  getLeadById
);

router.put(
  "/:id",
  authenticateToken,
  updateLead
);

router.delete(
  "/:id",
  authenticateToken,
  deleteLead
);

module.exports = router;