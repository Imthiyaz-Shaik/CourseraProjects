const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

// Dummy book data



// GET all books
router.get('/', (req, res) => {
    res.json({ books });
});

// GET book by ISBN
router.get('/:isbn', (req, res) => {
    const book = books.find(b => b.isbn === req.params.isbn);
    if (book) {
        res.json(book);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// POST add a new book (Protected)
router.post('/', authenticate, (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    res.status(201).json(newBook);
});

// PUT update a book (Protected)
router.put('/:isbn', authenticate, (req, res) => {
    const bookIndex = books.findIndex(b => b.isbn === req.params.isbn);
    if (bookIndex !== -1) {
        books[bookIndex] = { ...books[bookIndex], ...req.body };
        res.json(books[bookIndex]);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

// DELETE a book (Protected)
router.delete('/:isbn', authenticate, (req, res) => {
    const bookIndex = books.findIndex(b => b.isbn === req.params.isbn);
    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.json(deletedBook);
    } else {
        res.status(404).json({ message: "Book not found" });
    }
});

module.exports = router;