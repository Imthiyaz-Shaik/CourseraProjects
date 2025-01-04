const express = require("express");
const { getAllBooks, getBookByISBN } = require("../controllers/bookController");

const router = express.Router();

// GET all books
router.get("/", getAllBooks);

// GET a specific book by ISBN
router.get("/:isbn", getBookByISBN);

module.exports = router;
