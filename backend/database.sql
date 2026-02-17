CREATE DATABASE finance_app;

CREATE TABLE users(
	userId INT PRIMARY KEY AUTO_INCREMENT,
    fullName VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255) NOT NULL,
    balance DECIMAL(10,2) DEFAULT 0.00,
    expenses DECIMAL(10,2) DEFAULT 0.00
);

CREATE TABLE transactions(
    userId INT,
	transactionId INT PRIMARY KEY AUTO_INCREMENT,
    transactDate DATETIME DEFAULT CURRENT_TIMESTAMP,
	category VARCHAR(50) NOT NULL,
    amount INT NOT NULL,
    expenseTitle VARCHAR(50) NOT NULL,
    message VARCHAR(255),

    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE 
);

CREATE TABLE templates(
    userId INT,
	templateId INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    budgetPeriod enum('Daily', 'Weekly', 'Monthly') NOT NULL,
    isDefault BOOLEAN DEFAULT FALSE,
    startDate DATE,
    endDate DATE,

    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE templateCategories(
	id INT AUTO_INCREMENT PRIMARY KEY,
    templateId INT NOT NULL,
    category_name VARCHAR(100) NOT NULL,
    limit_amount DECIMAL(10,2) NOT NULL,

    FOREIGN KEY (templateId) REFERENCES templates(templateId) ON DELETE CASCADE
);