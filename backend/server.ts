import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

// CORS Middleware aktivieren
app.use(cors());

// GET-Route definieren
app.get('/api/test', (req: Request, res: Response) => {
    res.json({ message: 'Hello World' });
});

// Server starten
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});