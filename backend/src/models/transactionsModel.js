import database from "../config/database.js";

export async function createTransaction(transaction) {
    const connection = await database.getConnection();

    try {
        await connection.beginTransaction();

        const { 
            transactDate, 
            category, 
            amount, 
            expenseTitle, 
            message,
            userId
        } = transaction;

        const [addTransaction] = await connection.execute(
            `INSERT INTO transactions(
                userId, transactDate, category, amount, expenseTitle, message
            ) 
            VALUES (?, ?, ?, ?, ?, ?)`, 
            [userId, transactDate, category, amount, expenseTitle, message]
        );

        const [getUserBalance] = await connection.execute(
            `SELECT balance, expenses FROM users WHERE userId = ?`, 
            [userId]
        );
        const currentBalance = parseFloat(getUserBalance[0].balance);
        const currentExpenses = parseFloat(getUserBalance[0].expenses);

        if(category === "Money") {
            const newBalance = currentBalance + amount;

            const [updateUserBalance] = await connection.execute(
                `UPDATE users SET balance = ? WHERE userId = ?`,
                [newBalance, userId]
            );
        }else if(amount > currentBalance){
            throw new Error("Insufficient funds");

        }else{
            const newBalance = currentBalance - amount;
            const newExpenses = currentExpenses + amount;

            const [updateUserBalance] = await connection.execute(
                `UPDATE users SET balance = ?, expenses = ? WHERE userId = ?`,
                [newBalance, newExpenses, userId]
            );
        }

        await connection.commit();
        return { "message": "Transaction created successfully" };

    } catch (error) {
        await connection.rollback();
        return { "error": error.message };

    } finally {
        connection.release();
    }
}

export async function getTransactions(userId) {
    try {
        const query = "SELECT * FROM transactions WHERE userId = ? ORDER BY transactDate DESC";
        const [rows] = await database.execute(query, [userId]);
        return rows;
    } catch (error) {
        throw new Error("Error fetching transactions: " + error.message);
    }   
}