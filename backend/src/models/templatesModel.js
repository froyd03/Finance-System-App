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

    try {
        const { name, description, content } = template;
        const [result] = await database.query('INSERT INTO templates (name, description, content) VALUES (?, ?, ?)', [name, description, content]);
        return { id: result.insertId, ...template };
    } catch (error) {
        console.error('Error creating template:', error);
        throw error;
    }   

}