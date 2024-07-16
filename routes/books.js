
const express = require('express');
const router = express.Router();
const Book = require('../models/book');

// Middleware to fetch a book by ID
async function getBook(req, res, next) {
  let book;
  try {
    book = await Book.findById(req.params.id);
    console.log('Fetched book:', book); 
    if (!book) {
      console.log('Book not found');
      return res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    console.error('Error fetching book:', err.message);
    return res.status(500).json({ message: err.message });
  }
  res.book = book; 
  next();
}


// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one book
router.get('/:id', getBook, (req, res) => {
  res.send(res.book); 
});


// Create one book
router.post('/', async (req, res) => {
  const book = new Book({
    author: req.body.author,
    description: req.body.description,
    bookToChannel: req.body.bookToChannel
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Update one book
router.patch('/:id', getBook, async (req, res) => {
  if (req.body.author != null) {
    res.book.author = req.body.author;
  }
  if (req.body.description != null) {
    res.book.description = req.body.description;
  }
  if (req.body.bookToChannel != null) {
    res.book.bookToChannel = req.body.bookToChannel;
  }
  try {
    const updatedBook = await res.book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one book
router.delete('/:id', getBook, async (req, res) => {
  try {
    await Book.deleteOne({ _id: res.book._id }); 
    res.json({ message: 'Deleted Book' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
