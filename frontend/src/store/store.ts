import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { CategoryEntry } from "@/types";

export const useStore = defineStore('store', () => {

    const categoriesForDate = ref<CategoryEntry[]>([
        { id: 1, name: 'Kategorie 1', time: 120, color: '#264653' },
        { id: 2, name: 'Kategorie 2', time: 65, color: '#2A9D8F' },
        { id: 3, name: 'Kategorie 3', time: 33, color: '#E9C46A' },
        { id: 4, name: 'Kategorie 4', time: 367, color: '#F4A261' },
        { id: 5, name: 'Kategorie 5', time: 89, color: '#E76F51' },
        { id: 6, name: 'Kategorie 6', time: 89, color: '#D4A5A5' },
        { id: 7, name: 'Kategorie 1', time: 120, color: '#264653' },
        { id: 8, name: 'Kategorie 2', time: 65, color: '#2A9D8F' },
        { id: 9, name: 'Kategorie 3', time: 33, color: '#E9C46A' },
        { id: 10, name: 'Kategorie 4', time: 21, color: '#F4A261' },
        { id: 11, name: 'Kategorie 5', time: 69, color: '#E76F51' },
    ]);

    async function saveCategoriesForDate() {
        // TODO:
    }

    async function getCategoriesForDate(date: string) {
        // TODO:
    }

    return { categoriesForDate, saveCategoriesForDate, getCategoriesForDate };
});
