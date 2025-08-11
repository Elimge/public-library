-- /backend/src/config/schema.sql

-- Remove the db if exists
DROP DATABASE IF EXISTS library_db; 

-- Create the database
CREATE DATABASE library_db;

-- Select the db to use it
USE library_db;

-- Tables creation
CREATE TABLE users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    identification VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(25)
);

CREATE TABLE books (
    isbn VARCHAR(150) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150) NOT NULL,
    release_year INT
);

CREATE TABLE loans (
    id_loan INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    isbn VARCHAR(150) NOT NULL,
    loan_date DATE NOT NULL,
    return_date DATE, 
    status ENUM('checked out', 'returned', 'overdue') NOT NULL,
    CONSTRAINT fk_loans_users FOREIGN KEY (id_user) REFERENCES users(id_user),
    CONSTRAINT fk_loans_books FOREIGN KEY (isbn) REFERENCES books(isbn)
);



