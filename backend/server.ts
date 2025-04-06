import express from 'express';
import cors from 'cors';
import categoryRouter from './src/controllers/category';

export const app = express();
const PORT = 3000;

// CORS Middleware aktivieren
app.use(cors());

// Use the category router
app.use(categoryRouter);

// Server starten
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});