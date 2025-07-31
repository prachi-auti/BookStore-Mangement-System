const express = require("express");
const databaseconnection = require("./database");
const bookRouter = require("./router/book_routes");
const cors = require("cors");

const app = express();

// 1. Apply middleware at the top
app.use(cors());              // ✅ Correct usage
app.use(express.json());      // ✅ Parses incoming JSON

// 2. Connect to the database
databaseconnection();         // ✅ Connect MongoDB

// 3. Default route
app.get("/", (req, res) => {
    res.send("Hello World!!");
});

// 4. Book API routes
app.use('/book', bookRouter);

// 5. Start server
app.listen(8000, () => {
    console.log("Port Listening on 8000");
});
