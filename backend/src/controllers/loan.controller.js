// backend/src/controllers/loan.controller.js

const loanService = require("../services/loan.service.js");

/**
 * @description Controller to list all loans.
 * @param {object} req - Express's request object.
 * @param {object} res - Express's response object.
 */
const listLoans = async (req, res) => {
    try {
        //Call the service
        const loans = await loanService.getAllLoans();
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: "Error getting all loans", error: error.message });
    }
};

/**
 * @description Controller to get a single loan by its ID.
 * @param {object} req - Express's request object. The loan ID is expected in req.params.
 * @param {object} res - Express's response object.
 */
const getLoan = async (req, res) => {
    try {
        // req.params is an object containing route parameters. For a route like '/:id',
        // the value will be in req.params.id.
        const { id } = req.params;
        const loan = await loanService.getLoanById(id);

        if (loan) {
            // If the service finds the loan, send it back with a 200 OK status.
            res.status(200).json(loan);
        } else {
            // If the service returns null, it means the loan was not found.
            // Respond with a 404 Not Found status.
            res.status(404).json({ message: `Loan with ID ${id} not found.` })
        }
    } catch (error) {
        res.status(500).json({ message: "Error getting the loan", error: error.message });
    }
};

/**
 * @description Controller to create a new loan.
 * @param {object} req - Express's request object. The loan data is expected in the request body (req.body).
 * @param {object} res - Express's response object.
 */
const createLoan = async (req, res) => {
    try {
        // req.body contains the JSON payload sent by the client. The express.json()
        // middleware is required in server.js for this to work.
        const newLoan = await loanService.createLoan(req.body);
        // On successful creation, the standard response is 201 Created.
        // It's good practice to send the newly created resource back to the client.
        res.status(201).json(newLoan);
    } catch (error) {
        res.status(500).json({ message: "Error creating the loan", error: error.message });
    }
}

/**
 * @description Controller to update an existing loan by its ID.
 * @param {object} req - Express's request object. ID is in req.params, update data is in req.body.
 * @param {object} res - Express's response object.
 */
const updateLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const updateLoan = await loanService.updateLoanById(id, req.body);
        
        if (updateLoan) {
            res.status(200).json(updateLoan);
        } else {
            res.status(404).json({ message: `Loan with ID ${id} not found.` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error updating the loan", error: error.message });
    }
}

/**
 * @description Controller to delete a loan by its ID.
 * @param {object} req - Express's request object. The loan ID is expected in req.params.
 * @param {object} res - Express's response object.
 */
const deleteLoan = async (req, res) => {
    try {
        const { id } = req.params; 
        const wasDeleted = await loanService.deleteLoanById(id);

        if (wasDeleted) {
            // For a successful DELETE operation, the standard response is 204 No Content.
            // This response must not contain a body, so we use .send() instead of .json().
            res.status(204).send();
        } else {
            res.status(404).json({ message: `Loan with ID ${id} not found.` });
        }
    } catch (error) {
        res.status(500).json({ message: "Error deleting the loan", error: error.message });
    }
}

/**
 * @description Controller to list all loans for a specific user.
 * @param {object} req - Express's request object. The user ID is in req.params.
 * @param {object} res - Express's response object.
 */
const listLoansByUser = async (req, res) => {
    try {
        const { id } = req.params;
        const loans = await loanService.getLoansByUserId(id);
        // This will correctly return an empty array with a 200 OK status if the user
        // has no loans, which is the desired behavior.
        res.status(200).json(loans);
        
    } catch (error) {
        res.status(500).json({ message: "Error getting the user's loans", error: error.message });
    }
};

/**
 * @description Controller to list all active ('checked out') loans.
 * @param {object} req - Express's request object.
 * @param {object} res - Express's response object.
 */
const listActiveLoans = async (req, res) => {
    try {
        const activeLoans = await loanService.getActiveLoans();
        res.status(200).json(activeLoans);
    } catch (error) {
        res.status(500).json({ message: "Error getting active loans", error: error.message });
    }
};

/**
 * @description Controller to list the loan history of a specific book by its ISBN.
 * @param {object} req - Express's request object. The ISBN is in req.params.
 * @param {object} res - Express's response object.
 */
const listLoanHistory = async (req, res) => {
    try {
        const { isbn } = req.params;
        const history = await loanService.getLoanHistoryByIsbn(isbn);
        res.status(200).json(history);
    } catch (error) {
        res.status(500).json({ message: "Error getting the book's loan history", error: error.message });
    }
};

// Export all controller functions to be used in the loan routes file.
module.exports = {
    listLoans, 
    getLoan,
    createLoan,
    updateLoan,
    deleteLoan,
    listLoansByUser,
    listActiveLoans,
    listLoanHistory
};