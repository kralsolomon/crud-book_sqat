const BookModel = require("../models/Book");

exports.getAllBooks = async () => {
  return await BookModel.find();
};

exports.createBook = async (book) => {
  return await BookModel.create(book);
};
exports.getBookById = async (id) => {
  return await BookModel.findById(id);
};

exports.updateBook = async (id, book) => {
  return await BookModel.findByIdAndUpdate(id, book);
};

exports.deleteBook = async (id) => {
  return await BookModel.findByIdAndDelete(id);
};
