const bookService = require("../services/BookService");

exports.getAllBooks = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.json({ data: books, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const book = await bookService.createBook(req.body);
    res.json({ data: book, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    res.json({ data: book, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.json({ data: book, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await bookService.deleteBook(req.params.id);
    res.json({ data: book, status: "success" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
