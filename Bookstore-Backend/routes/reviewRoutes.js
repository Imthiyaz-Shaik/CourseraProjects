const express = require("express");
const { addReview } = require("../controllers/reviewController");
const { authenticateUser } = require("../middlewares/authMiddleware");

const router = express.Router();

// POST a review (Protected route)
router.post("/", authenticateUser, addReview);

module.exports = router;
