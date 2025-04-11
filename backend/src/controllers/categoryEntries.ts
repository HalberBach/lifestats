import express, { Request, Response } from 'express';
import {CategoryEntry} from "../models/interfaces";

const router = express.Router();

router.get('/categoryEntries', (req, res) => {
    const date = req.query.date;
    // TODO: fetch categories for Date from database
    const categoryEntriesForDate: CategoryEntry[] = [
        { id: 1, name: 'Kategorie 1', time: 120, color: '#264653'},
        { id: 2, name: 'Kategorie 2', time: 65, color: '#2A9D8F' },
        { id: 3, name: 'Kategorie 3', time: 33, color: '#E9C46A' },
        { id: 4, name: 'Kategorie 4', time: 367, color: '#F4A261' },
        { id: 5, name: 'Kategorie 5', time: 89, color: '#E76F51' },
        { id: 6, name: 'Kategorie 6', time: 89, color: '#D4A5A5' },
    ];
    res.json(categoryEntriesForDate);
})
router.get('/categoryEntries/last30Days', (req, res) => {
    //TODO: fetch categoryEntries for last 30 days from database
    const last30Days: CategoryEntry[]= [
        { id: 1, name: 'Kategorie 1', time: 120, color: '#264653'},
        { id: 2, name: 'Kategorie 2', time: 230, color: '#2A9D8F' },
        { id: 3, name: 'Kategorie 3', time: 33, color: '#E9C46A' },
        { id: 4, name: 'Kategorie 4', time: 367, color: '#F4A261' },
        { id: 5, name: 'Kategorie 5', time: 89, color: '#E76F51' },
        { id: 6, name: 'Kategorie 6', time: 450, color: '#D4A5A5' },
        { id: 7, name: 'Kategorie 7', time: 120, color: '#264653' },
        { id: 8, name: 'Kategorie 8', time: 65, color: '#2A9D8F' },
        { id: 9, name: 'Kategorie 9', time: 450, color: '#E9C46A' },
        { id: 10, name: 'Kategorie 10', time: 21, color: '#F4A261' },
        { id: 11, name: 'Kategorie 11', time: 69, color: '#E76F51' },
    ]
    res.json(last30Days);
})
router.get('/categoryEntries/totalTime', (req, res) => {
    //TODO: fetch total time for each category from database
    const totalTime: CategoryEntry[] = [
        { id: 1, name: 'Kategorie 1', time: 120, color: '#264653'},
        { id: 2, name: 'Kategorie 2', time: 2309, color: '#2A9D8F' },
        { id: 3, name: 'Kategorie 3', time: 330, color: '#E9C46A' },
        { id: 4, name: 'Kategorie 4', time: 367, color: '#F4A261' },
        { id: 5, name: 'Kategorie 5', time: 455, color: '#E76F51' },
        { id: 6, name: 'Kategorie 6', time: 1000, color: '#D4A5A5' },
        { id: 7, name: 'Kategorie 7', time: 120, color: '#264653' },
        { id: 8, name: 'Kategorie 8', time: 65, color: '#2A9D8F' },
        { id: 9, name: 'Kategorie 9', time: 450, color: '#E9C46A' },
        { id: 10, name: 'Kategorie 10', time: 221, color: '#F4A261' },
        { id: 11, name: 'Kategorie 11', time: 69, color: '#E76F51' },
    ];
    res.json(totalTime);
})

router.put('/categoryEntries', (req: Request, res: Response) => {
    const { date, categories }: { date: Date ; categories: CategoryEntry[] } = req.body;

    if (!date || !Array.isArray(categories)) {
        res.status(400).json({ error: 'Invalid input' });
    }

    try {
        // TODO: save CategoryEntries to database
        console.log('Received date:', date);
        console.log('Received categories:', categories);

        res.status(200).json({ message: 'Category entries saved successfully!' });
    } catch (error) {
        console.error('Error saving category entries:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;