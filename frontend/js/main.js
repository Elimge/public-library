// frontend/js/main.js

document.addEventListener("DOMContentLoaded", () => {

    const API_URL = "http://localhost:3000/api/v1";

    const addLoanForm = document.getElementById("add-loan-form");
    const loansTableBody = document.getElementById("loans-table-body")

    const editLoanModalEl = document.getElementById("editLoanModal");
    const editLoanModal = new bootstrap.Modal(editLoanModalEl);
    const editLoanForm = document.getElementById("edit-loan-form");
    const saveEditButton = document.getElementById("save-edit-button");

    /**
     * @description Creates the HTML for a single loan table row.
     * @param {object} loan - The loan object.
     * @returns {string} The HTML string for the table row.
     */
    const createLoanRow = (loan) => `
        <td class="align-middle">${loan.id_loan}</td>
        <td class="align-middle">${loan.id_user}</td>
        <td class="align-middle">${loan.isbn}</td>
        <td class="align-middle">${new Date(loan.loan_date).toLocaleDateString()}</td>
        <td class="align-middle">${loan.return_date ? new Date(loan.return_date).toLocaleDateString() : 'N/A'}</td>
        <td class="align-middle"><span class="badge bg-info text-dark">${loan.status}</span></td>
        <td>
            <button class="btn btn-warning btn-sm edit-btn" data-loan-id="${loan.id_loan}">Edit</button>
            <button class="btn btn-danger btn-sm delete-btn" data-loan-id="${loan.id_loan}">Delete</button>
        </td>
    `;
 
    /**
     * @description Fetches all loans from the API and renders them in the table.
     */
    const fetchAndRenderLoans = async () => {
        try {
            // GET request
            const response = await fetch(`${API_URL}/loans`);

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const loans = await response.json();

            loansTableBody.innerHTML = "";
            
            loans.forEach(loan => {
                const row = document.createElement("tr");

                row.setAttribute("data-row-id", loan.id_loan);
                row.innerHTML = createLoanRow(loan);
                loansTableBody.appendChild(row);
            });

        } catch (error) {
            console.error("Error fetching loans: ", error);
            loansTableBody.innerHTML = '<tr><td colspan="7" class="text-center text-danger">Error loading data.</td></tr>';
        }
    };

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
            const response = await fetch(`${API_URL}/loans`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(loanData), 
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error creating the loan.");
            }

            addLoanForm.reset();

            fetchAndRenderLoans();

            alert("Loan created successfuly!");

        } catch (error) {
            console.error("Error creating loan:", error);
            alert(`An error occurred: ${error.message}`);
        }
    });

    loansTableBody.addEventListener("click", async (event) => {
        const target = event.target;
        const loanId = target.dataset.loanId;

        if (target.classList.contains("delete-btn")) {
            if (confirm("Are you sure you want to delete this loan? This action cannot be undone.")) {
                try {
                    const response = await fetch(`${API_URL}/loans/${loanId}`, { method: "DELETE" });
                    if (response.status === 204) {
                        target.closest("tr").remove();
                        alert("Loan deleted successfuly");
                    } else {
                        const errorData = await response.json();
                        throw new Error(errorData.message);
                    }
                } catch (error) {
                    alert(`Error deleting loan: ${error.message}`);
                }
            }
        }
    
        if (target.classList.contains("edit-btn")) {
            try {
                const response = await fetch(`${API_URL}/loans/${loanId}`);
                if (!response.ok) throw new Error("Could not load data for editing.");

                const loan = await response.json();

                document.getElementById("edit-loan-id").value = loan.id_loan;
                document.getElementById("edit-id_user").value = loan.id_user;
                document.getElementById("edit-isbn").value = loan.isbn;
                document.getElementById("edit-loan_date").value = new Date(loan.loan_date).toISOString().split("T")[0];
                document.getElementById("edit-return_date").value = loan.return_date ? new Date(loan.return_date).toISOString().split("T")[0] : "";
                document.getElementById("edit-status").value = loan.status;

                editLoanModal.show();
            } catch (error) {
                alert(`Error: ${error.message}`);
            }
        }
    });

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
            const response = await fetch(`${API_URL}/loans/${loanId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }

            const updateLoanFromServer = await response.json();

            const rowToUpdate = document.querySelector(`tr[data-row-id='${loanId}']`);
            if (rowToUpdate) {
                rowToUpdate.innerHTML = createLoanRow(updateLoanFromServer);
            }

            editLoanModal.hide();
            alert("Loan updated successfully");
        } catch (error) {
            alert(`Error updating: ${error.message}`);
        }
    });

    fetchAndRenderLoans(); 
});