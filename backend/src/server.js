// backend/src/server.js

const express = require("express");
const pool = require("./config/database.js");
const loanRoutes = require("./routes/loan.routes.js");
const bookRoutes = require("./routes/book.routes.js");
const userRoutes = require("./routes/user.routes.js");

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello world! The library's API is working.");
}); 

app.use("/api/v1/loans", loanRoutes);

app.use("/api/v1/books", bookRoutes);

app.use("/api/v1/users", userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    pool.getConnection()
        .then(connection => {
            console.log("Successfully connected to the database.");
            connection.release();
        })
        .catch(err => {
            console.error("Failed to connect to the database:", err);
        });
});