// backend/seeders/load-usersjs

// IMPORTS
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

/**
 * Loads user data from a CSV file and inserts it into the `users` table.
 *
 * The function reads `users.csv`, parses each row, and batches all user data into 
 * a single `INSERT INTO` query to populate the database efficiently.
 *
 * @async
 * @function loadUsers
 * @param {import("mysql2/promise").PoolConnection} connection - MySQL connection object from the pool
 * @returns {Promise<void>} Resolves when users are successfully inserted or logs an error
 */
async function loadUsers(connection) {
    try {
        console.log("Filling the'users' table...");
        const users = []; 

        // Read and parse CSV data into an array
        await new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, "data", "users.csv"))
                .pipe(csv({
                    headers: ["name", "identification", "email", "phone"], // Define CSV column headers
                    skipLines: 1                                           // Skip header line in file
                }))
                .on("data", (row) => {
                    // Push each row's data as an array to users
                    users.push([row.name, row.identification, row.email, row.phone]);
                })
                .on("end", resolve) // Resolve promise on successful completion
                .on("error", reject); // Reject promise on error
        });
        
        // Bulk insert user data into the database
        await connection.query("INSERT INTO users (name, identification, email, phone) VALUES ?", [users]);
        console.log(`${users.length} users inserted`);
    } catch (error) {
        console.error("Error loading users: ", error);
    }
}

module.exports = { loadUsers }; 