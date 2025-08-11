-- /backend/src/config/schema.sql
-- Description: Initializes the database schema for the Library Management System

-- --------------------------------------
-- Drop and recreate the database
-- --------------------------------------

-- Delete the database if it exists to start fresh
DROP DATABASE IF EXISTS library_db; 

-- Create a new database
CREATE DATABASE library_db;

-- Select the new database for use
USE library_db;

-- --------------------------------------
-- Table: users
-- Stores user information
-- --------------------------------------
CREATE TABLE users (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    identification VARCHAR(100) NOT NULL UNIQUE,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(25)
);

-- --------------------------------------
-- Table: books
-- Stores book metadata
-- --------------------------------------
CREATE TABLE books (
    isbn VARCHAR(150) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(150) NOT NULL,
    release_year INT
);

-- --------------------------------------
-- Table: loans
-- Tracks which books are loaned to which users
-- --------------------------------------
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
