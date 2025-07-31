const { Book } = require("../model/book_model");

// 🔹 Create (Add Book)
const addBookController = async (req, res) => {
  try {
    const body = req.body;

    // Field validation
    if (!body.BookName || !body.BookTitle || !body.Author || !body.SellingPrice || !body.PublishDate) {
      return res.status(400).json({
        Message: "All fields (BookName, BookTitle, Author, SellingPrice, PublishDate) are required.",
        Success: false
      });
    }

    const bookAdd = await Book.create(body);
    return res.status(201).json({
      Message: "Book added successfully!",
      Success: true,
      Id: bookAdd._id
    });

  } catch (error) {
    return res.status(500).json({
      Message: error.message,
      Success: false
    });
  }
};

// 🔹 Read (Get All Books)
const getAllBooksController = async (req, res) => {
  try {
    const booklists = await Book.find({});
    return res.status(200).json({
      Message: "Books fetched successfully.",
      Success: true,
      TotalCount: booklists.length,
      Booklists: booklists
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
      Success: false
    });
  }
};

// 🔹 Update Book by ID
const updateBookController = async (req, res) => {
  try {
    const bookId = req.params.id;
    const updates = req.body;

    const updatedBook = await Book.findByIdAndUpdate(bookId, updates, { new: true });

    if (!updatedBook) {
      return res.status(404).json({
        Message: "Book not found",
        Success: false
      });
    }

    return res.status(200).json({
      Message: "Book updated successfully",
      Success: true,
      UpdatedBook: updatedBook
    });
  } catch (error) {
    return res.status(500).json({
      Message: error.message,
      Success: false
    });
  }
};

// 🔹 Delete Book by ID
const deleteBookController = async (req, res) => {
  try {
    const bookId = req.params.id;

    const deletedBook = await Book.findByIdAndDelete(bookId);

    if (!deletedBook) {
      return res.status(404).json({
        Message: "Book not found",
        Success: false
      });
    }

    return res.status(200).json({
      Message: "Book deleted successfully",
      Success: true
    });

  } catch (error) {
    return res.status(500).json({
      Message: error.message,
      Success: false
    });
  }
};

// 🔚 Export all controllers
module.exports = {
  addBookController,
  getAllBooksController,
  updateBookController,
  deleteBookController
};
