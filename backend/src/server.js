// backend/src/server.js

/**
 * Entry point for the Library API server.
 * Sets up Express app, routes, middleware, and database connection.
 */

// Import required modules
const express = require("express");
const cors = require('cors');
const pool = require("./config/database.js");

// Import API routes
const loanRoutes = require("./routes/loan.routes.js");
const bookRoutes = require("./routes/book.routes.js");
const userRoutes = require("./routes/user.routes.js");

// Create Express app instance
const app = express(); 

// The port the server will listen on
const PORT = process.env.PORT || 3000; 

// --- Middlewares ---
// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());
// Parse incoming JSON requests
app.use(express.json());

// --- Root route ---

/**
 * GET /
 * @description Root endpoint to confirm API is running
 * @route GET /
 * @returns {string} Confirmation message
 */
app.get("/", (req, res) => {
    res.send("Hello world! The library's API is working.");
}); 

/**
 * Loan-related endpoints
 * @route /api/v1/loans
 */
app.use("/api/v1/loans", loanRoutes);


/**
 * Book-related endpoints
 * @route /api/v1/books
 */
app.use("/api/v1/books", bookRoutes);

/**
 * User-related endpoints
 * @route /api/v1/users
 */
app.use("/api/v1/users", userRoutes);

// --- Start the server ---

/**
 * Start the server and connect to the database
 * @function
 */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // Test database connection
    pool.getConnection()
        .then(connection => {
            console.log("Successfully connected to the database.");
            connection.release(); // Release the connection back to the pool
        })
        .catch(err => {
            console.error("Failed to connect to the database:", err);
        });
});