// backend/seeders/load-books.js

// IMPORTS
const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

/**
 * Loads book data from a CSV file and inserts it into the `books` table.
 *
 * It reads from `books.csv`, parses each row, formats the data appropriately,
 * and performs a bulk insert into the `books` table.
 *
 * @async
 * @function loadBooks
 * @param {import("mysql2/promise").PoolConnection} connection - MySQL connection object from the pool
 * @returns {Promise<void>} Resolves when books are inserted or logs an error
 */
async function loadBooks(connection) {
    try {
        console.log("Filling the'books' table...");
        const books = [];

        // Read and parse CSV data
        await new Promise((resolve, reject) => {
            fs.createReadStream(path.join(__dirname, "data", "books.csv"))
                .pipe(csv({
                    headers: ["isbn", "title", "release_year", "author"],
                    skipLines: 1
                }))
                .on("data", (row) => {
                    // Push each book entry as an array
                    books.push([row.isbn, row.title, row.author, parseInt(row.release_year)]); // Ensure release year is an integer
                })
                .on("end", resolve)   // Resolve the promise on successful parsing
                .on("error", reject); // Reject the promise on error
        });

        // Bulk insert books into the database
        await connection.query("INSERT INTO books (isbn, title, author, release_year) VALUES ?", [books]);
        console.log(`${books.length} books inserted`);
    } catch (error) {
        // Log any error that occurs during the process
        console.error("Error loading books: ", error);
    } 
}

module.exports = { loadBooks };