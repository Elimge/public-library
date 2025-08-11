// backend/src/services/book.service.js

// Import the database connection pool, which manages connections
const pool = require("../config/database.js");

/**
 * @description Gets the top 5 most loaned books from the database.
 * @returns {Promise<Array>} An array of objects, each representing a book and its loan count.
 */
const getTop5MostLoanedBooks = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT 
                b.isbn, 
                b.title, 
                b.author, 
                COUNT(l.id_loan) AS loan_count
            FROM 
                loans l
            JOIN 
                books b ON l.isbn = b.isbn
            GROUP BY 
                b.isbn, b.title, b.author
            ORDER BY 
                loan_count DESC
            LIMIT 5;
        `);
        return rows;
    } catch (error) {
        console.error("Error in the serice while getting top 5 books: ", error);
        // Re-throw the error so it can be handled by the controller that called this function.
        throw error;
    }
};

// The function is exported so it can be used by 'book.controller.js'.
module.exports = {
    getTop5MostLoanedBooks
};