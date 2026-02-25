import database from "../config/database.js";
import { isUserHasActiveTemplate } from "./userModel.js";

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

            //3. TODO: Update template_category table with new amount spent for the category if transaction is created from a template
            if(await isUserHasActiveTemplate(userId)) {
                //TODO: checks if the transaction category is existing from the active template categories
                const templateCategories = await getUserTemplateCategories(userId);

                for(const templateCategory of templateCategories) {
                   if(category === templateCategory.category_name){
                        // check if amount liimit is not exceeded
                        const newSpent = parseFloat(templateCategory.spent) + amount;

                        if(newSpent > parseFloat(templateCategory.limit_amount)) {
                            throw new Error(`Your budget for ${templateCategory.category_name} is exceeded`);
                        }

                        //TODO: update the amount spent for the category in template_category table
                        const [updateTemplateCategory] = await connection.execute(
                            `UPDATE templatecategories SET spent = ? WHERE templateId = ? AND category_name = ?`,
                            [newSpent, templateCategory.templateId, category]
                        );
                    }
                }
            }
        }

        await connection.commit();
        return { "message": "Transaction created successfully" };

    } catch (error) {
        await connection.rollback();
        return { "Transaction failed! try again, error": error.message };

    } finally {
        connection.release();
    }
}

export async function getUserTemplateCategories(userId) {

    try {
        const [rows] = await database.execute(
            `SELECT 
                templates.templateId,
                templatecategories.category_name,
                templatecategories.limit_amount,
                templatecategories.spent
            FROM users 
            JOIN templates ON users.activeTemplateId = templates.templateId
            JOIN templatecategories ON templates.templateId = templatecategories.templateId
            WHERE users.userId = ?`, 
            [userId]
        );

        return rows;
    } catch (error){
        return { "Error fetching template categories": error.message };
    }
}

export async function getTransactions(userId) {
    try {
        const query = "SELECT * FROM transactions WHERE userId = ? ORDER BY transactDate DESC";
        const [rows] = await database.execute(query, [userId]);
        return rows;

        //TODO: Format date and amount
    } catch (error) {
        return { "Error fetching transactions": error.message };
    }   
}