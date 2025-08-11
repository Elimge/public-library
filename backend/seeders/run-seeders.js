// backend/seeders/run-seeders.js

// IMPORTS
const { loadUsers } = require("./load-users.js");
const { loadBooks } = require("./load-books.js");
const { loadLoans } = require("./load-loans.js");

const pool = require("../src/config/database.js");

/**
 * Executes all seeders in sequence using a shared database connection.
 * 
 * This function connects to the database, runs the `loadUsers`, `loadBooks`, 
 * and `loadLoans` seeders, and then ensures that the connection is properly 
 * released and the pool is closed afterward.
 * 
 * @async
 * @function seeders
 * @returns {Promise<void>} Resolves when all seeders have been executed and the connection is closed.
 */
async function seeders() {
    let connection; 
    
    try {
        // Establish a connection from the pool
        connection = await pool.getConnection();
        console.log("Connection to the database established");
        console.log("Starting seeders...");
        
        await loadUsers(connection);
        await loadBooks(connection);
        await loadLoans(connection);
        
        console.log("Seeders loaded successfully");
    } catch (error) {
        // Log any error that occurs during the seeding process
        console.error("Error during the main seed proccess", error);
    } finally {
        // Release the connection back to the pool if it was acquired
        if (connection) {
            connection.release();
            console.log("Connection released back to the pool.")
        }
        // Gracefully end the connection pool
        await pool.end();
    }
}

// Run the seeding process
seeders();