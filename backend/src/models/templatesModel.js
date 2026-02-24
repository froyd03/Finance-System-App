import database from '../config/database.js';
import { isUserHasActiveTemplate } from './userModel.js';

export async function getTemplates(userId) {
    try {
        const [rows] = await database.query(
            `SELECT * FROM templates WHERE userId = ?`,
            [userId]
        );
        return rows;
      
    } catch (error) {
        console.error('Error fetching templates:', error);
        throw error;
    }
}

export async function getTemplateByUserId(userId) {
    try {
        const [rows] = await database.query(
            `SELECT * FROM templates WHERE userId = ?`,
            [userId]
        );

        const templates = [];
        for (const row of rows) {
            const categories = await getCategoriesByTemplateId(row.templateId);
            templates.push({
                name: row.name,
                budgetPeriod: row.budgetPeriod,
                categories: categories
            });
        }
        return templates;
      
    } catch (error) {
        console.error('Error fetching templates:', error);
        throw error;
    }
}

async function getCategoriesByTemplateId(templateId) {
    try {
        const [rows] = await database.query(
            `SELECT 
                category_name AS name, 
                limit_amount as limitAmount
            FROM templatecategories 
            WHERE templateId = ?`,
            [templateId]
        );
        return rows;
    } catch (error) {
        console.error('Error fetching template by ID:', error);
        throw error;
    }
}

export async function setAsActiveTemplate(templateId, userId) { //patch
    const connection = await database.getConnection();

    try {
        await connection.beginTransaction();

        if(await isUserHasActiveTemplate(userId)) {
            throw new Error("User already has an active template. Please deactivate the current template before setting a new one.");
        }
        //1. TODO: UPDATE users activeTemplate column with a templateId to reference with template table
        await connection.execute( //possible some bugs here
            `UPDATE users SET activeTemplateId = ? WHERE userId = ?;`, 
            [templateId, userId]
        );
        
        // determine the budget peiod of the template being set as active
        const [row] = await connection.execute(
            `SELECT 
                templates.budgetPeriod
            FROM users 
            JOIN templates ON users.activeTemplateId = templates.templateId
            WHERE users.userId = ?`,
            [userId]
        );
        const budgetPeriod = row[0].budgetPeriod;

        const date = new Date();
        if(budgetPeriod === 'Daily') {
            date.setUTCDate(date.getUTCDate() + 1);
        } else if (budgetPeriod === 'Weekly') {
            date.setUTCDate(date.getUTCDate() + 7);
        } else if (budgetPeriod === 'Monthly') {
            date.setUTCMonth(date.getUTCMonth() + 1);
        }

        const endDate = date.toISOString().split('T')[0];

        //2. TODO: Update template startDate to current date and endDate to startDate + budgetPeriod
        await connection.execute(
            `UPDATE templates SET startDate = CURDATE(), endDate = ? WHERE templateId = ? AND userId = ?`, 
            [endDate, templateId, userId]
        );

        await connection.commit();
        return { message: "Template set as active successfully" };

    } catch (error) {
        await connection.rollback();
        return { error: error.message };

    } finally {
        connection.release();
    }
}

export async function createTemplate(template) {
    const connection = await database.getConnection();

    try {
        await connection.beginTransaction();

        const { userId, templateName, budgetPeriod, categories} = template;

        const [result] = await connection.execute(
            `INSERT INTO templates(userId, name, budgetPeriod) VALUES (?, ?, ?)`, 
            [userId, templateName, budgetPeriod]
        );

        for (const category of categories) {
            await connection.execute(
                `INSERT INTO templatecategories(templateId, category_name, limit_amount) VALUES (?, ?, ?)`, 
                [result.insertId, category.name, category.limitAmount]
            );
        }
        console.log('Template created with ID:', result.insertId);
        await connection.commit();
        return { id: result.insertId, message: "Template created successfully" };

    } catch (error) {
        await connection.rollback();
        return { error: 'Error creating template', details: error.message };

    } finally {
        connection.release();
    } 
}