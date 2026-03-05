import express from 'express';
const router = express.Router();
import * as TemplateModel from '../models/templatesModel.js';

router.get('/', async (req, res) => {
    try {
        const userId = req.user.id; 
        const templates = await TemplateModel.getTemplateByUserId(userId);   
        res.status(200).json(templates);

    } catch (error) {
        
        console.error('Error fetching templates:', error);
        res.status(500).json({ error: 'Failed to fetch templates' });
    }
});

router.get('/user-template', async (req, res) => {
    try {
        const userId = req.user.id; 
        const templates = await TemplateModel.getActiveTemplateCategoryUserId(userId);   
        res.status(200).json(templates);

    } catch (error) {
        
        console.error('Error fetching templates:', error);
        res.status(500).json({ error: 'Failed to fetch templates' });
    }
});

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

router.patch('/set-active', async (req, res) => {
    try {
        const { templateId, userId } = req.body;
        const result = await TemplateModel.setAsActiveTemplate(templateId, userId);
        res.status(200).json(result);

    } catch (error) {
        console.error('Error setting active template:', error);
        res.status(500).json({ error: 'Failed to set active template' });   
    }
});
    
export default router;