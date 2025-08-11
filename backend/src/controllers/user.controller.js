// backend/src/controllers/user.controller.js

// Import the user service.
const userService = require("../services/user.service.js");

/**
 * @description Controller to handle the request for listing users with overdue loans.
 *              It calls the appropriate service function and formats the HTTP response.
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object, used to send the response.
 */
const listUsersWithOverdueLoans = async (req, res) => {
    try {
        // 1. Delegate the task of fetching data to the service layer.
        const users = await userService.getUsersWithOverdueLoans();
        // 2. Respond with a 200 OK status and the list of users in JSON format.
        res.status(200).json(users);
    } catch (error) {
        // 3. If an error occurs in the service, catch it and send a 500 Internal Server Error response.
        res.status(500).json({ message: "Error getting users with overdue loans", error: error.message });
    }
};

// Export the controller function to be used by the user routes.
module.exports = {
    listUsersWithOverdueLoans
}