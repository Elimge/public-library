// backend/seeders/load-loans.js

// IMPORTS
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

/**
 * Loads loan records from a CSV file and inserts them into the `loans` table.
 *
 * It maps user identification numbers to user IDs from the database,
 * then reads loan records from `library-loans.csv`, transforms the data,
 * and performs a bulk insert into the `loans` table.
 *
 * @async
 * @function loadLoans
 * @param {import("mysql2/promise").PoolConnection} connection - MySQL connection object from the pool
 * @returns {Promise<void>} Resolves when all loan records are inserted or logs an error
 */
async function loadLoans(connection) {
    try {
        console.log("Filling the 'loans' table...");

        // Get user IDs and identifications from the database to map them
        const [userRows] = await connection.query("SELECT id_user, identification FROM users");
        const userMap = new Map();
        userRows.forEach(user => {
                userMap.set(user.identification, user.id_user);
        });

        const loans = [];

        // Read and parse loan CSV data
        await new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, "data", "library-loans.csv"))
                .pipe(csv())
                .on("data", (row) => {
                    const userId = userMap.get(row.identification);
                    const isbn = row.isbn;
                    const status = row.status;

                    // Only insert valid rows with known userId and ISBN
                    if (userId && isbn) {
                        loans.push([
                            userId,
                            isbn,
                            row.loan_date,
                            row.return_date || null, 
                            status
                        ]);
                    }
                })
                .on("end", resolve)    // Resolve promise when file reading ends
                .on("error", reject);  // Reject promise if an error occurs
        });

        // Insert parsed loans into the database
        await connection.query("INSERT INTO loans (id_user, isbn, loan_date, return_date, status) VALUES ?", [loans]);
        console.log(`${loans.length} loans inserted`);
    } catch (error) {
        console.error("Error loading loans: ", error);
    }
}

module.exports = { loadLoans };