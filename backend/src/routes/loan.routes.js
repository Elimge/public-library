// backend/src/routes/loan.routes.js.

// Import the Express Router and the loan controller.
const { Router } = require("express");
const loanController = require("../controllers/loan.controller.js");

// Create a new router instance for all loan-related endpoints.
const router = Router();

// --- Route Definitions ---
// The main server file (`server.js`) mounts this router under the '/api/v1/loans' prefix.
// The order of routes matters, especially when using dynamic parameters like ':id'.
// More specific routes should be defined BEFORE more generic, dynamic routes.

// --- CRUD Routes ---

// GET /api/v1/loans -> Lists all loans. 
router.get("/", loanController.listLoans);

// POST /api/v1/loans -> Creates a new loan.
router.post("/", loanController.createLoan);

// --- Special-Purpose Routes ---

// GET /api/v1/loans/active -> Lists all currently active loans.
// This is a specific route and must be placed before the '/:id' route
router.get("/active", loanController.listActiveLoans);

// GET /api/v1/loans/user/:id -> Lists all loans for a specific user.
// The ':id' here will be interpreted as the user's ID.
router.get("/user/:id", loanController.listLoansByUser);

// GET /api/v1/loans/history/:isbn -> Lists the loan history for a specific book.
// The ':isbn' is a dynamic parameter for the book's ISBN.
router.get("/history/:isbn", loanController.listLoanHistory);

// --- Dynamic Routes with ID (must be placed last) ---

// GET /api/v1/loans/:id -> Gets a single loan by its ID.
// If a request like GET /api/v1/loans/active were made and this route was first,
// Express would mistakenly think 'active' is an ID. That's why order is critical.
router.get("/:id", loanController.getLoan);

// PUT /api/v1/loans/:id -> Updates a loan by its ID.
router.put("/:id", loanController.updateLoan);

// DELETE /api/v1/loans/:id -> Deletes a loan by its ID.
router.delete("/:id", loanController.deleteLoan);

// Export the fully configured router.
module.exports = router;