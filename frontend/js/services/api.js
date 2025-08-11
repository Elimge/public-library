// frontend/js/services/api.js

/**
 * @file This module acts as a dedicated layer for all communication with the backend API.
 *       It centralizes all fetch requests, making the application easier to manage if API endpoints change.
 */

// The base URL for all API requests.
const API_URL = "http://localhost:3000/api/v1";

/**
 * @description A generic wrapper around the fetch API to handle JSON responses and errors consistently.
 * @param {string} endpoint - The API endpoint to call (e.g., '/loans').
 * @param {object} [options={}] - Optional fetch options (method, headers, body).
 * @returns {Promise<any>} A promise that resolves with the JSON data from the response.
 * @throws {Error} Throws an error if the network response is not 'ok'.
 */
const fetchJSON = async (endpoint, options = {}) => {
    const response = await fetch(`${API_URL}${endpoint}`, options);
    // Handle '204 No Content' responses, which have no body to parse (e.g., from DELETE).
    if (response.status === 204) return null; 
    // Check if the response was successful. If not, parse the error message from the body.
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
    }
    // If successful, parse and return the JSON body.
    return response.json();
};

// --- Public API Functions ---

export const getLoans = () => fetchJSON("/loans");
export const getLoanById = (id) => fetchJSON(`/loans/${id}`);
export const createLoan = (loanData) => fetchJSON("/loans", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loanData),
});
export const updateLoan = (id, loanData) => fetchJSON(`/loans/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loanData),
});
export const deleteLoan = (id) => fetchJSON(`/loans/${id}`, {method: "DELETE"});

