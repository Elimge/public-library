// backend/src/services/user.service.js

// Import the database connection pool.
const pool = require("../config/database.js");

/**
 * @description Gets all users who have at least one loan with 'overdue' status.
 * @returns {Promise<Array>} An array of user objects.
 */
const getUsersWithOverdueLoans = async () => {
    try {
        const [rows] = await pool.query(`
            SELECT DISTINCT
                u.*
            FROM 
                users u
            JOIN 
                loans l ON u.id_user = l.id_user
            WHERE 
                l.status = 'overdue';
        `);
        return rows;
    } catch (error) {
        console.error("Error in the service while getting users with overdue loans: ", error);
        throw error;
    }
};

// Export the function to be used in 'user.controller.js'.
module.exports = {
    getUsersWithOverdueLoans
}