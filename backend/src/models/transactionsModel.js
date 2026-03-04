import database from "../config/database.js";
import { isUserHasActiveTemplate } from "./userModel.js";

export async function createTransaction(transaction, userId) {
    const connection = await database.getConnection();

    try {
        await connection.beginTransaction();

        const { 
            category, 
            amount, 
            expenseTitle, 
            message,
        } = transaction;

        const [addTransaction] = await connection.execute(
            `INSERT INTO transactions(
                userId, category, amount, expenseTitle, message
            ) 
            VALUES (?, ?, ?, ?, ?)`, 
            [userId, category, amount, expenseTitle, message]
        );

        const [getUserBalance] = await connection.execute(
            `SELECT balance, expenses FROM users WHERE userId = ?`, 
            [userId]
        );
        const currentBalance = parseFloat(getUserBalance[0].balance);
        const currentExpenses = parseFloat(getUserBalance[0].expenses);
        const floatAmount = parseFloat(amount);

        if(category === "Income") {
            const newBalance = currentBalance + floatAmount;

            const [updateUserBalance] = await connection.execute(
                `UPDATE users SET balance = ? WHERE userId = ?`,
                [newBalance, userId]
            );
        }else if(floatAmount > currentBalance){
            throw new Error("Insufficient funds");

        }else{
            const newBalance = currentBalance - floatAmount;
            const newExpenses = currentExpenses + floatAmount;

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
                        const newSpent = parseFloat(templateCategory.spent) + floatAmount;

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
        return { "message": "Something went wrong, Try again." };

    } finally {
        connection.release();
    }
}

async function getUserTemplateCategories(userId) {

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

export async function getTransactionByCategory(category, userId) {
    try {

        const [transactionCategory] = await database.execute(
            `SELECT * FROM transactions 
            WHERE category = ? AND userId = ?
            ORDER BY transactDate DESC`,
            [category, userId]
        );

        return transactionCategory;
    } catch(error) {
        return { "message": error };
    }
}

export async function getTransactions(userId) {
    try {
        const query = "SELECT * FROM transactions WHERE userId = ? ORDER BY transactDate DESC";
        console.log(userId)
        const [rows] = await database.execute(query, [userId]);
        return rows;

        //TODO: Format date and amount
    } catch (error) {
        console.error('Error fetching transactions model:', error);
        return { "Error fetching transactions": error.message };
    }   
}