import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {Category, CategoryEntry} from "@/types";
import {CalendarDate} from "@internationalized/date";

export const useStore = defineStore('store', () => {

    const currentDate = ref<CalendarDate>(new CalendarDate(2025, 3, 3));
    const categoriesForDate = ref<CategoryEntry[]>([
        { id: 1, name: 'Kategorie 1', time: 120, color: '#264653'},
        { id: 2, name: 'Kategorie 2', time: 65, color: '#2A9D8F' },
        { id: 3, name: 'Kategorie 3', time: 33, color: '#E9C46A' },
        { id: 4, name: 'Kategorie 4', time: 367, color: '#F4A261' },
        { id: 5, name: 'Kategorie 5', time: 89, color: '#E76F51' },
        { id: 6, name: 'Kategorie 6', time: 89, color: '#D4A5A5' },
        { id: 7, name: 'Kategorie 7', time: 120, color: '#264653' },
        { id: 8, name: 'Kategorie 8', time: 65, color: '#2A9D8F' },
        { id: 9, name: 'Kategorie 9', time: 33, color: '#E9C46A' },
        { id: 10, name: 'Kategorie 10', time: 21, color: '#F4A261' },
        { id: 11, name: 'Kategorie 11', time: 69, color: '#E76F51' },
    ]);
    const categories = ref<Category[]>(
        [
            { id: 1, name: 'Kategorie 1', color: '#264653' },
            { id: 2, name: 'Kategorie 2', color: '#2A9D8F' },
            { id: 3, name: 'Kategorie 3', color: '#E9C46A' },
            { id: 4, name: 'Kategorie 4', color: '#F4A261' },
            { id: 5, name: 'Kategorie 5', color: '#E76F51' },
            { id: 6, name: 'Kategorie 6', color: '#D4A5A5' },
            { id: 7, name: 'Kategorie 7', color: '#264653' },
            { id: 8, name: 'Kategorie 8', color: '#2A9D8F' },
            { id: 9, name: 'Kategorie 9', color: '#E9C46A' },
            { id: 10, name: 'Kategorie 10', color: '#F4A261' },
            { id: 11, name: 'Kategorie 11', color: '#E76F51' },
        ]
    )

    async function test() {
        console.log('test');
    }

    async function updateCategories(newCategories: Category[]) {
        //TODO: Kategorien in DB überschreiben und auch die Anzeige aktualisieren
        console.log('updateCategories');
        categories.value = newCategories;
    }

    async function saveCategoriesEntriesForDate(date: CalendarDate, categories: CategoryEntry[])  {
        // TODO: In DB überschreiben und WENN von dieses Datum gerade selektiert ist, dann auch die Anzeige aktualisieren
        categoriesForDate.value = categories;
        console.log(categoriesForDate.value[0].time);
    }

    async function getCategoriesForDate(date: CalendarDate) : Promise<CategoryEntry[]> {
        // TODO
        return [{ id: 1, name: 'Kategorie 1', time: 120, color: '#264653'}];
    }

    async function changeSelectedDate(date: CalendarDate) {
        currentDate.value = date;
        categoriesForDate.value = await getCategoriesForDate(date);
        console.log('changeSelectedDate');
    }

    return { categoriesForDate,
        categories,
        saveCategoriesEntriesForDate,
        getCategoriesForDate,
        changeSelectedDate,
        updateCategories,
        test,
        currentDate };
});
