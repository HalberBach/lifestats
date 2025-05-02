import express from 'express';
import categoryRouter from './src/controllers/category';
import categoryEntriesRouter from './src/controllers/categoryEntries';

export const app = express();
const PORT = 8080;

// Use the category router
app.use(express.json());
app.use('/api', categoryRouter);
app.use('/api', categoryEntriesRouter);

// Server starten
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});