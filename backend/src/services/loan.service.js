// backend/src/services/loan.service.js

// Import the database connection pool.
const pool = require("../config/database.js");

/**
 * @description Gets all loans from the database.
 * @returns {Promise<Array>} An array of objects, where each object is a loan.
 */
const getAllLoans = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM loans");
        return rows;
    } catch (error) {
        console.error("Error in the service while getting the loans:", error);
        throw error;
    }
};

/**
 * @description Gets a single loan by its ID.
 * @param {number} id - The ID of the loan to retrieve.
 * @returns {Promise<object|null>} The loan object, or null if not found.
 */
const getLoanById = async (id) => {
    try {
        const [rows] = await pool.query("SELECT * FROM loans WHERE id_loan = ?", [id]);
        // If no row is found, the query returns an empty array. `rows[0]` will be undefined.
        // We return null to clearly indicate "not found".
        return rows[0] || null;
    } catch (error) {
        console.error("Error in the service while getting the loan by ID: ", error);
        throw error;
    }
};

/**
 * @description Creates a new loan in the database.
 * @param {object} loanData - The data for the new loan (id_user, isbn, loan_date, etc.).
 * @returns {Promise<object>} An object with the ID of the newly created loan.
 */
const createLoan = async (loanData) => {
    try {
        const { id_user, isbn, loan_date, return_date, status } = loanData;
        const [result] = await pool.query("INSERT INTO loans (id_user, isbn, loan_date, return_date, status) VALUES (?, ?, ?, ?, ?)", [id_user, isbn, loan_date, return_date, status]);
        // The 'result' object from an INSERT query contains metadata, including 'insertId',
        // which is the auto-generated ID of the new row.
        return { id: result.insertId, ...loanData };
    } catch (error) {
        console.error("Error in the service while creating the loan: ", error);
        throw error;
    }
}

/**
 * @description Updates an existing loan by its ID.
 * @param {number} id - The ID of the loan to update.
 * @param {object} loanData - An object with the fields to update.
 * @returns {Promise<object|null>} The updated loan object, or null if not found.
 */
const updateLoanById = async (id, loanData) => {
    try {
        const { id_user, isbn, loan_date, return_date, status } = loanData;
        const [result] = await pool.query("UPDATE loans SET id_user = ?, isbn = ?, loan_date = ?, return_date = ?, status = ? WHERE id_loan = ?", [id_user, isbn, loan_date, return_date, status, id]);
        // The 'result' object from an UPDATE query contains 'affectedRows', which tells
        // us how many rows were changed. If it's 0, no row with that ID was found.
        if (result.affectedRows === 0) {
            return null;
        }
        return { id: parseInt(id), ...loanData };
    } catch (error) {
        console.error("Error in the service while updating the loan: ", error);
        throw error;
    }
};

/**
 * @description Deletes a loan by its ID from the database (Hard Delete).
 * @param {number} id - The ID of the loan to delete.
 * @returns {Promise<boolean>} True if the loan was deleted, false if not found.
 */
const deleteLoanById = async (id) => {
    try {
        const [result] = await pool.query("DELETE FROM loans WHERE id_loan = ?", [id]);
        // Similar to UPDATE, we check 'affectedRows' to confirm a deletion occurred.
        return result.affectedRows > 0;
    } catch (error) {
        console.error("Error in the service while deleting the loan: ", error);
        throw error;
    }
};

/**
 * @description Gets all loans for a specific user ID.
 * @param {number} userId - The ID of the user whose loans are to be retrieved.
 * @returns {Promise<Array>} An array of loan objects for the specified user.
 */
const getLoansByUserId = async (id_user) => {
    try {
        const [rows] = await pool.query("SELECT * FROM loans WHERE id_user = ?", [id_user]);
        return rows || null;
    } catch (error) {
        console.error("Error in the service while getting the loan by User's ID: ", error);
        throw error;
    }
};

/**
 * @description Gets all loans with 'checked out' status.
 * @returns {Promise<Array>} An array of active loan objects.
 */
const getActiveLoans = async () => {
    try {
        const [rows] = await pool.query("SELECT * FROM loans WHERE status = 'checked out'");
        return rows;
    } catch (error) {
        console.error("Error in the service while getting active loans: ", error);
        throw error;
    }
}

/**
 * @description Gets the entire loan history for a specific book by its ISBN.
 * @param {string} isbn - The ISBN of the book to look up.
 * @returns {Promise<Array>} An array of loan objects for the specified book.
 */
const getLoanHistoryByIsbn = async (isbn) => {
    try {
        const [rows] = await pool.query("SELECT * FROM loans WHERE isbn = ?", [isbn]);
        return rows;
    } catch (error) {
        console.error("Error in the service while getting loan history by ISBN:", error);
        throw error;
    }
};

module.exports = {
    getAllLoans,
    getLoanById,
    createLoan,
    updateLoanById,
    deleteLoanById,
    getLoansByUserId,
    getActiveLoans,
    getLoanHistoryByIsbn
};