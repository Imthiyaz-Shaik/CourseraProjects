const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// In-memory data for demonstration
let users = [];
let books = [
  {
      isbn: "12345",
      author: "Chinua Achebe",
      title: "Things Fall Apart",
      reviews: [4.5/5]
  },
  {
      isbn: "67890",
      author: "Hans Christian Andersen",
      title: "Fairy Tales",
      reviews: [4.3/5]
  },
  {
      isbn: "11223",
      author: "George Orwell",
      title: "1984",
      reviews: [4.7/5]
  },
  {
      isbn: "33445",
      author: "F. Scott Fitzgerald",
      title: "The Great Gatsby",
      reviews: [4/5]
  },
  {
      isbn: "55667",
      author: "Harper Lee",
      title: "To Kill a Mockingbird",
      reviews: [4.8/5]
  },
  {
      isbn: "77889",
      author: "J.K. Rowling",
      title: "Harry Potter and the Sorcerer's Stone",
      reviews: [3.8/5]
  },
  {
      isbn: "99101",
      author: "J.R.R. Tolkien",
      title: "The Hobbit",
      reviews: [5/5]
  },
  {
      isbn: "22334",
      author: "Jane Austen",
      title: "Pride and Prejudice",
      reviews: [4.3/5]
  },
  {
      isbn: "44556",
      author: "Mary Shelley",
      title: "Frankenstein",
      reviews: [4/5]
  },
  {
      isbn: "66778",
      author: "Homer",
      title: "The Odyssey",
      reviews: [5/5]
  }
];

// Secret for JWT
const SECRET_KEY = "your_secret_key";

// Helper functions
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Access denied!" });
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid token!" });
    req.user = user;
    next();
  });
};

// Routes

// Get all books
app.get("/books", (req, res) => {
  res.json({ books });
});

// Get books by ISBN
app.get("/books/isbn/:isbn", (req, res) => {
  const book = books.find((b) => b.isbn === req.params.isbn);
  book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});

// Get books by author
app.get("/books/author/:author", (req, res) => {
  const filteredBooks = books.filter((b) => b.author === req.params.author);
  filteredBooks.length > 0
    ? res.json(filteredBooks)
    : res.status(404).json({ message: "No books found for this author" });
});

// Get books by title
app.get("/books/title/:title", (req, res) => {
  const filteredBooks = books.filter((b) => b.title === req.params.title);
  filteredBooks.length > 0
    ? res.json(filteredBooks)
    : res.status(404).json({ message: "No books found for this title" });
});

// Get book reviews
app.get("/books/:isbn/reviews", (req, res) => {
  const book = books.find((b) => b.isbn === req.params.isbn);
  book ? res.json(book.reviews) : res.status(404).json({ message: "Book not found" });
});

// Register a new user
app.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).json({ message: "User registered successfully!" });
});

// Login as a registered user
app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(403).json({ message: "Invalid credentials!" });
  }
  const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Add/modify a book review
app.post("/books/:isbn/reviews", authenticateToken, (req, res) => {
  const { review } = req.body;
  const book = books.find((b) => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.reviews.push({ user: req.user.username, review });
  res.status(201).json({ message: "Review added!" });
});

// Delete a book review by the same user
app.delete("/books/:isbn/reviews", authenticateToken, (req, res) => {
  const book = books.find((b) => b.isbn === req.params.isbn);
  if (!book) return res.status(404).json({ message: "Book not found" });

  book.reviews = book.reviews.filter((r) => r.user !== req.user.username);
  res.json({ message: "Review deleted!" });
});

// Get all books using async callback function
app.get("/books/async", (req, res) => {
  setTimeout(() => {
    res.json(books);
  }, 1000);
});

// Search for a book by ISBN
app.get("/search/isbn/:isbn", async (req, res) => {
  const book = books.find((b) => b.isbn === req.params.isbn);
  book ? res.json(book) : res.status(404).json({ message: "Book not found" });
});

// Search for a book by author
app.get("/search/author/:author", async (req, res) => {
  const filteredBooks = books.filter((b) => b.author === req.params.author);
  res.json(filteredBooks);
});

// Search for a book by title
app.get("/search/title/:title", async (req, res) => {
  const filteredBooks = books.filter((b) => b.title === req.params.title);
  res.json(filteredBooks);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${5000}`);
});
