import express, { Request, Response } from 'express';
import {Category} from "../models/interfaces";

const router = express.Router();

router.get('/test', (req, res) => {
    res.json({ message: 'Hello, this is your test API!' });
});
router.put('/categories', (req: Request, res: Response) => {
    const categories: Category[] = req.body;
    if (!Array.isArray(categories)) {
        res.status(400).json({ error: 'Invalid input' });
    } else {
        try {
            // TODO: Here you would typically save the categories to a database
            console.log('Received categories:', categories);
            res.json({ message: 'Categories updated successfully!' });
        } catch (error) {
            console.error('Error updating categories:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
});

export default router;