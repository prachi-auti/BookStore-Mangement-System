const express = require("express");
const {
  deleteBookController,
  getAllBooksController,
  addBookController,
  updateBookController, // ✅ added for updating
} = require("../controller/book_controller");

const router = express.Router();

// 🔹 CREATE: Add a book
// POST http://localhost:8000/book/addbook
router.post("/addbook", addBookController);

// 🔹 READ: Get all books
// GET http://localhost:8000/book/booklists
router.get("/booklists", getAllBooksController);

// 🔹 DELETE: Delete a book by ID
// DELETE http://localhost:8000/book/deletebook/:id
router.delete("/deletebook/:id", deleteBookController);

// 🔹 UPDATE: Update a book by ID
// PUT http://localhost:8000/book/updatebook/:id
router.put("/updatebook/:id", updateBookController);

module.exports = router;
