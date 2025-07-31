const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  BookName: {
    type: String,
    required: true,
  },
  BookTitle: {
    type: String,
    required: true,
  },
  Author: {
    type: String,
    required: true,
  },
  SellingPrice: {
    type: String,
    required: true,
  },
  PublishDate: {
    type: Date,
  },
}, {
  timestamps: true
});

// 🔧 Note:
// mongoose.model("CollectionName", schema)
// Collection will be auto-lowercased and pluralized: "books"
const Book = mongoose.model("Book", BookSchema);

module.exports = { Book };
