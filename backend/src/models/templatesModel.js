import database from '../config/database.js';

export async function getTemplates() {
    try {
        const [rows] = await database.query('SELECT * FROM templates');
        return rows;
    } catch (error) {
        console.error('Error fetching templates:', error);
        throw error;
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