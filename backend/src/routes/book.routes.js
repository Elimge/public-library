// backend/src/routes/book.routes.js

// Import the Router object from Express to create a new router instance.
const { Router } = require("express");
// Import the corresponding controller. The router's job is to map HTTP requests
// to the correct controller function.
const bookController = require("../controllers/book.controller.js");

// Create a new router instance. This will handle all routes related to books.
const router = Router(); 

// --- Route Definitions ---
// All routes defined here are automatically prefixed with '/api/v1/books'
// as configured in `server.js`.

// GET /api/v1/books/most-loaned -> Retrieves the top 5 most loaned books.
// When a GET request is made to this path, Express will call the `listTopBooks` function
// from the bookController.
router.get("/most-loaned", bookController.listTopBooks);

// Export the router so it can be imported and used by the main server application.
module.exports = router; 