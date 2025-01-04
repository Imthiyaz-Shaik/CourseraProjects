const Book = require("../models/book");

exports.getAllBooks = async (req, res) => {
    try {
        const books = await Book.find().populate("reviews");
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBookByISBN = async (req, res) => {
    const { isbn } = req.params;

    try {
        const book = await Book.findOne({ isbn }).populate("reviews");
        if (!book) return res.status(404).json({ message: "Book not found" });

        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
