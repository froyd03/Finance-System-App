import express from 'express';
const router = express.Router();
import * as TemplateModel from '../models/templatesModel.js';

router.post('/', async (req, res) => {
    try {
        const template = req.body;
        const newTemplate = await TemplateModel.createTemplate(template);
        res.status(201).json(newTemplate);

    } catch (error) {

        console.error('Error creating template:', error);
        res.status(500).json({ error: 'Failed to create template' });
    }
  
});
    
export default router;