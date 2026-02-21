import database from '../config/database.js';

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

export async function setAsActiveTemplate(templateId) { //patch
    const connection = await database.getConnection();

    try {
        await connection.beginTransaction();
        
        //1. TODO: UPDATE users activeTemplate column with a templateId to reference with template table

        //2. TODO: Update template startDate to current date and endDate to startDate + budgetPeriod

        await connection.commit();
        return { message: "Template set as active successfully" };
    } catch (error) {
        await connection.rollback();
        throw error;
    }
}

//4. TODO: create a function that will be called when if theres an active temple from user table

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