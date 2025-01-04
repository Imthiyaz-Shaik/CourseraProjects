const Review = require("../models/review");
const Book = require("../models/book");

exports.addReview = async (req, res) => {
    const { bookId, content, rating } = req.body;
    const userId = req.user.id;

    try {
        const review = await Review.create({ book: bookId, user: userId, content, rating });
        await Book.findByIdAndUpdate(bookId, { $push: { reviews: review._id } });

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
