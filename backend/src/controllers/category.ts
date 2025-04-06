import express, { Request, Response } from 'express';

const router = express.Router();

const test = (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
};

router.get('/api/test', test);

export default router;