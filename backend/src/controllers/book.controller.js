// backend/src/controllers/book.controller.js

// Import the corresponding service file. The controller's job is to orchestrate
// calls to the service layer, not to interact with the database directly.
const bookService = require("../services/book.service.js");

/**
 * @description Controller to handle the request for the top 5 most loaned books.
 *              It calls the service, and sends the result as a JSON response.
 * @param {object} req - The Express request object. It contains information about the incoming HTTP request.
 * @param {object} res - The Express response object. It's used to send a response back to the client.
 */
const listTopBooks =  async (req, res) => {
    try {
        // 1. Call the service layer to get the data.
        //    The controller doesn't know or care *how* the data is fetched; it just asks for it.
        const topBooks = await bookService.getTop5MostLoanedBooks();
        // 2. Send a successful response.
        //    - res.status(200) sets the HTTP status code to '200 OK'.
        //    - res.json(topBooks) serializes the 'topBooks' array into a JSON string
        //      and sends it back as the response body.
        res.status(200).json(topBooks);
    } catch (error) {
        // 3. Handle any errors that might be thrown from the service layer.
        //    - res.status(500) sets the HTTP status code to '500 Internal Server Error'.
        //    - res.json(...) sends a structured error message to the client.
        res.status(500).json({ message: "Error getting the top 5 most loaned books", error: error.message });
    }
};

// Export the controller function so it can be wired up in the routes file
module.exports = {
    listTopBooks
}