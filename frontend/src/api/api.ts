import type {Category, CategoryEntry} from "@/types";
import axios from "axios";

export function useApi() {
    async function updateCategories(categories: Category[]) {
        try {
            const response = await axios.put('http://localhost:3000/api/categories', categories, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (!response.status === 200) {
                throw new Error('Fehler beim Laden der Daten');
            }
            return response.data;
        } catch (error) {
            console.error('Fehler:', error);  // Fehlerbehandlung
            return [];
        }
    }

    async function getCategoryEntriesForDate(date: Date): Promise<CategoryEntry[]> {
        try {
            const response = await axios.get(`http://localhost:3000/api/categoryEntries`, {
                params: { date },
            })
            if (!response.status === 200) {
                throw new Error('Fehler beim Laden der Daten');
            }
            return response.data;
        } catch (error) {
            console.error('Fehler:', error);  // Fehlerbehandlung
            return [];
        }
    }

    async function saveCategoryEntriesForDate(date: Date, categories: CategoryEntry[]) {
        try {
            const payload = { date, categories };
            const response = await axios.put(`http://localhost:3000/api/categoryEntries`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.status === 200) {
                throw new Error('Fehler beim Laden der Daten');
            }
            return response.data;
        } catch (error) {
            console.error('Fehler:', error);  // Fehlerbehandlung
            return [];
        }
    }

    async function getLast30Days(): Promise<Date[]> {
        try {
            const response = await axios.get('http://localhost:3000/api/categoryEntries/last30Days', {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.status === 200) {
                throw new Error('Fehler beim Laden der Daten');
            }
            return response.data;
        } catch (error) {
            console.error('Fehler:', error);  // Fehlerbehandlung
            return [];
        }
    }

    async function getTotalTime(): Promise<number> {
        try {
            const response = await axios.get('http://localhost:3000/api/categoryEntries/totalTime', {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            if (!response.status === 200) {
                throw new Error('Fehler beim Laden der Daten');
            }
            return response.data;
        } catch (error) {
            console.error('Fehler:', error);  // Fehlerbehandlung
            return [];
        }
    }

    return {
        updateCategories,
        getCategoryEntriesForDate,
        saveCategoryEntriesForDate,
        getLast30Days,
        getTotalTime,
    }
}