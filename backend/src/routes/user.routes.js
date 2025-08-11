// backend/src/routes/user.routes.js

// Import the Express Router.
const { Router } = require("express");
// Import the user controller.
const userController = require("../controllers/user.controller.js");

// Create a new router instance for user-related endpoints.
const router = Router();

// --- Route Definitions ---
// The main server file (`server.js`) will mount this router under the
// '/api/v1/users' prefix.

// GET /api/v1/users/with-overdue -> Retrieves all users with at least one overdue loan.
// This route maps the HTTP GET method and the path '/with-overdue' to the
// `listUsersWithOverdueLoans` controller function.
router.get("/with-overdue", userController.listUsersWithOverdueLoans);

// Export the router to be used in `server.js`.
module.exports = router;