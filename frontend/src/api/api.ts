import type {Category, CategoryEntry} from "@/types";
import type {CalendarDate} from "@internationalized/date";
import axios from "axios";

export async function updateCategories(categories: Category[]) {
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

export async function getCategoryEntriesForDate(date: CalendarDate): Promise<CategoryEntry[]> {
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

export async function saveCategoryEntriesForDate(date: Date, categories: CategoryEntry[]) {
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

export async function getLast30Days(): Promise<Date[]> {
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

export async function getTotalTime(): Promise<number> {
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