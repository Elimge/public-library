// frontend/js/ui/ui.js

/**
 * @file This module contains all functions that directly interact with or manipulate the DOM.
 *       It is responsible for rendering data, updating the UI, and does not contain any API logic.
 */

const getStatusBadge = (status) => {
    switch (status) {
        case "checked out": return "badge bg-primary";
        case "returned": return "badge bg-success";
        case "overdue": return "badge bg-danger";
        default: return "badge bg-secondary";
    }
};

const createLoanRow = (loan) => `
    <td class="align-middle">${loan.id_loan}</td>
    <td class="align-middle">${loan.id_user}</td>
    <td class="align-middle">${loan.isbn}</td>
    <td class="align-middle">${new Date(loan.loan_date).toLocaleDateString()}</td>
    <td class="align-middle">${loan.return_date ? new Date(loan.return_date).toLocaleDateString() : 'N/A'}</td>
    <td class="align-middle"><span class="${getStatusBadge(loan.status)}">${loan.status}</span></td>
    <td>
        <button class="btn btn-warning btn-sm edit-btn" data-loan-id="${loan.id_loan}">Edit</button>
        <button class="btn btn-danger btn-sm delete-btn" data-loan-id="${loan.id_loan}">Delete</button>
    </td>
`

export const renderLoans = (tableBody, loans) => {
    tableBody.innerHTML = "";
    loans.forEach(loan => {
        const row = document.createElement("tr");
        row.setAttribute("data-row-id", loan.id_loan);
        row.innerHTML = createLoanRow(loan);
        tableBody.appendChild(row);
    });
};

export const updateTableRow = (loan) => {
    // The 'id' from an updated record might be a number, but the attribute is a string.
    const rowToUpdate = document.querySelector(`tr[data-row-id='${loan.id}']`);
    if (rowToUpdate) {
        rowToUpdate.innerHTML = createLoanRow(loan);
    }
};

export const removeTableRow = (element) => {
    element.closest("tr").remove();
};

export const populateEditModal = (loan) => {
    document.getElementById("edit-loan-id").value = loan.id_loan;
    document.getElementById("edit-id_user").value = loan.id_user;
    document.getElementById("edit-isbn").value = loan.isbn;
    document.getElementById("edit-loan_date").value = new Date(loan.loan_date).toISOString().split("T")[0];
    document.getElementById("edit-return_date").value = loan.return_date ? new Date(loan.return_date).toISOString().split("T")[0] : "";
    document.getElementById("edit-status").value = loan.status;
}