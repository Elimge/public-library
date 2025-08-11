// frontend/js/app.js

/**
 * @file This is the main entry point for the application's frontend logic.
 *       It acts as an orchestrator, connecting user events to API calls and UI updates.
 */

import * as api from "./services/api.js";
import * as ui from "./ui/ui.js";

document.addEventListener("DOMContentLoaded", () => {
    // --- DOM Element References ---
    const addLoanForm = document.getElementById("add-loan-form");
    const loansTableBody = document.getElementById("loans-table-body")
    const editLoanModal = new bootstrap.Modal(document.getElementById("editLoanModal"));
    const saveEditButton = document.getElementById("save-edit-button");

    /**
     * @description Fetches the initial list of loans and renders them to the table.
     */
    const loadLoans = async () => {
        try { 
            const loans = await api.getLoans();
            ui.renderLoans(loansTableBody, loans);
        } catch (error) {
            console.error("Error loading loans: ", error);
            alert("Could not load loans.");
        }
    };

    // --- Event Listeners ---

    // Handles the submission of the "Add New Loan" form.
    addLoanForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const loanData = {
            id_user: document.getElementById("id_user").value,
            isbn: document.getElementById("isbn").value,
            loan_date: document.getElementById("loan_date").value,
            return_date: null, 
            status: "checked out" 
        };
        
        try {
            await api.createLoan(loanData);
            addLoanForm.reset();
            loadLoans(); // Refresh the table to show the new loan.
            alert("Loan created!");
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    });

    // Uses event delegation to handle clicks on the entire table body.
    loansTableBody.addEventListener("click", async (event) => {
        const target = event.target;
        const loanId = target.dataset.loanId;

        // Handle clicks on any "delete" button.
        if (target.classList.contains("delete-btn")) {
            if (confirm("Are you sure?")) {
                try {
                    await api.deleteLoan(loanId);
                    ui.removeTableRow(target); // Update UI immediately
                } catch (error) {
                    alert(`Error deleting loan: ${error.message}`);
                }
            }
        }
    
        // Handle clicks on any "edit" button.
        if (target.classList.contains("edit-btn")) {
            try {
                const loan = await api.getLoanById(loanId);
                ui.populateEditModal(loan);
                editLoanModal.show();
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }
    });

    // Handles the click on the "Save Changes" button within the modal.
    saveEditButton.addEventListener("click", async () => {
        const loanId = document.getElementById("edit-loan-id").value;
        const updatedData = {
            id_user: document.getElementById("edit-id_user").value,
            isbn: document.getElementById("edit-isbn").value,
            loan_date: document.getElementById("edit-loan_date").value,
            return_date: document.getElementById("edit-return_date").value || null,
            status: document.getElementById("edit-status").value
        };

        try {
            const updatedLoan = await api.updateLoan(loanId, updatedData);
            ui.updateTableRow(updatedLoan);
            editLoanModal.hide();
        } catch (error) {
            alert(`Error updating: ${error.message}`);
        }
    });

    // --- Initial Load ---
    loadLoans();
});