# Community Library - Loan Management System

A full-stack web application designed to manage the loan system for a free Community Library. This project digitizes and automates the process of tracking book loans, migrating from a manual Excel-based system to a robust, database-driven application with a dynamic web interface.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Author](#author)

## Project Description

The primary goal of this project was to develop a complete system to replace a manual loan registration process previously handled in an Excel file. The application provides a RESTful API backend to manage all data related to users, books, and loans, and an interactive frontend UI for library staff to perform daily operations.

The project covers the entire development lifecycle, from data analysis and database normalization to API development and frontend implementation.

## Features

### Backend (API)
-   Full CRUD (Create, Read, Update, Delete) functionality for **Loans**.
-   RESTful architecture with clear and consistent endpoints.
-   Automated database seeder to populate the database from CSV files.
-   **Special Endpoints:**
    -   Get all loans for a specific user.
    -   List the top 5 most loaned books.
    -   List all users with overdue loans.
    -   List all currently active loans.
    -   View the complete loan history for a specific book by its ISBN.

### Frontend (UI)
-   Dynamic and responsive single-page application feel.
-   Displays a real-time table of all loans from the database.
-   **Create Loans:** A form to add new loans, with the table updating instantly.
-   **Delete Loans:** A delete button on each row with a confirmation dialog.
-   **Update Loans:** An interactive "Edit" modal that fetches the latest data and allows for updates without a page reload.

## Tech Stack

-   **Backend:**
    -   **Runtime:** Node.js
    -   **Framework:** Express.js
    -   **Database:** MySQL
    -   **Libraries:** `mysql2` (Promise-based), `cors`, `dotenv`, `csv-parser`
-   **Frontend:**
    -   **Languages:** HTML5, CSS3, JavaScript (ES6 Modules)
    -   **Framework:** Bootstrap 5 for styling and components.
-   **Development:**
    -   **Version Control:** Git & GitHub
    -   **Package Manager:** npm
    -   **API Testing:** Thunder Client / Postman

## Architecture

-   **Backend:** A **Layered Architecture** was implemented to separate concerns:
    1.  **Routes Layer:** Defines API endpoints and directs traffic.
    2.  **Controller Layer:** Handles HTTP requests and responses, acting as a middleman.
    3.  **Service Layer:** Contains all the business logic and database queries.
-   **Frontend:** A **Modular Architecture** was used to keep the code organized and maintainable:
    1.  **API Service (`api.js`):** Centralizes all `fetch` calls to the backend.
    2.  **UI Module (`ui.js`):** Manages all direct DOM manipulation.
    3.  **App Orchestrator (`app.js`):** Connects user events to the API and UI modules.

## File Structure

The project is organized into two main directories: `backend` and `frontend`, clearly separating the server-side logic from the client-side application.

```bash
    public-library/
├── .gitignore # Specifies intentionally untracked files to ignore.
├── README.md # This documentation file.
│
├── backend/
│ ├── .env # Stores environment variables (database credentials).
│ ├── package.json # Defines the Node.js project and its dependencies.
│ ├── package-lock.json # Records the exact versions of dependencies.
│ ├── node_modules/ # Contains all installed npm packages.
│ │
│ ├── src/ # Main source code for the API.
│ │ ├── config/
│ │ │ ├── database.js # Configures and exports the MySQL connection pool.
│ │ │ └── schema.sql # The SQL script to create the database and tables.
│ │ │
│ │ ├── controllers/ # Handles the logic for incoming requests and outgoing responses.
│ │ │ ├── book.controller.js
│ │ │ ├── loan.controller.js
│ │ │ └── user.controller.js
│ │ │
│ │ ├── routes/ # Defines the API endpoints and maps them to controllers.
│ │ │ ├── book.routes.js
│ │ │ ├── loan.routes.js
│ │ │ └── user.routes.js
│ │ │
│ │ ├── services/ # Contains the core business logic and database interactions.
│ │ │ ├── book.service.js
│ │ │ ├── loan.service.js
│ │ │ └── user.service.js
│ │ │
│ │ └── server.js # The entry point of the backend application; creates and starts the Express server.
│ │
│ └── seeders/ # Scripts to populate the database with initial data.
│ ├── data/ # The source CSV files for seeding.
│ │ ├── books.csv
│ │ ├── library-loans.csv
│ │ └── users.csv
│ ├── load-books.js # Script to load book data.
│ ├── load-loans.js # Script to load loan data.
│ ├── load-users.js # Script to load user data.
│ └── run-seeders.js # The main script that executes all seeders in order.
│
├── frontend/ # Contains the entire user interface (the client application).
│ └── js/ 
│ │ └── services/ 
│ │ │ └── api.js # Centralizes all 'fetch' requests to the backend.
│ │ └── ui/ 
│ │ │ └── ui.js # Module dedicated to handling all DOM manipulation.
│ └── app.js # The main entry point; orchestrates events, API calls, and UI updates.
└── index.html # The single HTML page for the entire application.

```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

You will need the following software installed on your system:
-   [Node.js](https://nodejs.org/) (which includes npm)
-   [MySQL Server](https://dev.mysql.com/downloads/mysql/)

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Elimge/public-library.git
    cd public-library
    ```

2.  **Setup the Backend:**
    ```bash
    cd backend
    npm install
    ```

3.  **Create the Environment File:**
    -   Create a `.env` file in the `backend` directory.
    -   Add the following content, replacing the password with your own MySQL root password:
        ```env
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=your_mysql_password
        DB_DATABASE=library_db
        ```

4.  **Create and Populate the Database:**
    -   Log in to your MySQL console: `mysql -u root -p`
    -   Run the schema script to create the database and tables:
        ```sql
        SOURCE /path/to/your/project/public-library/backend/src/config/schema.sql;
        ```
    -   Exit MySQL (`exit;`).
    -   Run the seeder script from the `backend` directory to populate the database:
        ```bash
        node seeders/run-seeders.js
        ```

5.  **Run the Backend Server:**
    ```bash
    npm run dev
    ```
    The API will be running at `http://localhost:3000`.

6.  **Run the Frontend:**
    -   The recommended way is to use the **Live Server** extension in Visual Studio Code.
    -   Right-click on the `frontend/index.html` file and select "Open with Live Server".
    -   This will open the application in your browser, typically at a URL like `http://127.0.0.1:5500/frontend/index.html`.

## API Endpoints

The API is versioned under `/api/v1/`.

| Method   | Endpoint                          | Description                               |
| :------- | :-------------------------------- | :---------------------------------------- |
| `GET`    | `/loans`                          | Get a list of all loans.                  |
| `POST`   | `/loans`                          | Create a new loan.                        |
| `GET`    | `/loans/:id`                      | Get a single loan by its ID.              |
| `PUT`    | `/loans/:id`                      | Update an existing loan by its ID.        |
| `DELETE` | `/loans/:id`                      | Delete a loan by its ID.                  |
| `GET`    | `/loans/usuario/:id`              | Get all loans for a specific user.        |
| `GET`    | `/loans/activos`                  | Get all currently active loans.           |
| `GET`    | `/loans/historial/:isbn`          | Get the loan history for a specific book. |
| `GET`    | `/books/mas-prestados`            | Get the top 5 most loaned books.          |
| `GET`    | `/users/con-retrasos`             | Get all users with overdue loans.         |


## Author

-   **[Miguel Canedo](https://github.com/Elimge)**