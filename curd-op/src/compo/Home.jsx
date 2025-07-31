import React, { useEffect, useState } from 'react';
import "../style/Home.css";
import { bookbaseurl } from "../axiosInstance";

const Home = () => {
  const [bookForm, setBookform] = useState({
    BookName: "",
    BookTitle: "",
    Author: "",
    SellingPrice: "",
    PublishDate: ""
  });

  const [books, setBooks] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch books on mount
  useEffect(() => {
    fetchBooks();
  }, []);

  // 🔹 Fetch all books
  const fetchBooks = async () => {
    try {
      const res = await bookbaseurl.get("/booklists");
      if (res.data?.Booklists) {
        setBooks(res.data.Booklists);
      }
    } catch (error) {
      alert("Error fetching books");
    }
  };

  // 🔹 Handle input
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBookform((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // 🔹 Add or Update book
  const handleSubmit = async () => {
    try {
      if (
        !bookForm.BookName ||
        !bookForm.BookTitle ||
        !bookForm.Author ||
        !bookForm.SellingPrice ||
        !bookForm.PublishDate
      ) {
        alert("Please fill in all fields");
        return;
      }

      if (editId) {
        // Update
        const res = await bookbaseurl.put(`/updatebook/${editId}`, bookForm);
        alert(res.data.Message);
        setEditId(null);
      } else {
        // Create
        const res = await bookbaseurl.post("/addbook", bookForm);
        alert(res.data.Message);
      }

      setBookform({
        BookName: "",
        BookTitle: "",
        Author: "",
        SellingPrice: "",
        PublishDate: ""
      });

      fetchBooks();
    } catch (error) {
      alert("Error submitting book");
    }
  };

  // 🔹 Edit Book
  const handleEdit = (book) => {
    setBookform({
      BookName: book.BookName,
      BookTitle: book.BookTitle,
      Author: book.Author,
      SellingPrice: book.SellingPrice,
      PublishDate: book.PublishDate?.slice(0, 10)
    });
    setEditId(book._id);
  };

  // 🔹 Delete Book
  const handleDelete = async (id) => {
    try {
      await bookbaseurl.delete(`/deletebook/${id}`);
      alert("Book deleted");
      fetchBooks();
    } catch (error) {
      alert("Failed to delete book");
    }
  };

  return (
    <div>
      <div className='container-home'>
        <div className='full'>
          {["BookName", "BookTitle", "Author", "SellingPrice", "PublishDate"].map((field) => (
            <div key={field}>
              <label htmlFor={field}>{field.replace(/([A-Z])/g, " $1")}</label>
              <input
                type={field === "PublishDate" ? "date" : "text"}
                placeholder={field}
                id={field}
                name={field}
                value={bookForm[field]}
                onChange={handleFormChange}
              />
            </div>
          ))}
        </div>
      </div>

      <div style={{ margin: "1rem" }}>
        <button onClick={handleSubmit}>{editId ? "Update" : "Submit"}</button>
      </div>

      <div className='container2'>
        <div className='full'>
          <table>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Book Title</th>
                <th>Author</th>
                <th>Selling Price</th>
                <th>Published Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {books.length > 0 ? (
                books.map((book) => (
                  <tr key={book._id}>
                    <td>{book.BookName}</td>
                    <td>{book.BookTitle}</td>
                    <td>{book.Author}</td>
                    <td>₹{book.SellingPrice}</td>
                    <td>{book.PublishDate?.slice(0, 10)}</td>
                    <td>
                      <button onClick={() => handleEdit(book)}>Edit</button>{" "}
                      <button onClick={() => handleDelete(book._id)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No books found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
