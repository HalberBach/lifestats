import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {Category, CategoryEntry} from "@/types";
import {CalendarDate} from "@internationalized/date";
import { useApi } from "@/api/api.ts";

export const useStore = defineStore('store', () => {
    const api = useApi();

    const currentDate = ref<CalendarDate>(new CalendarDate(2025, 3, 3));
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

    const categoryEntriesForDate = ref<CategoryEntry[]>([
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

    async function updateCategories(newCategories: Category[]) {
        return api.updateCategories(newCategories).then(() => {
            categories.value = newCategories;
            console.log('updateCategories');
        }).catch(() => {
            // TODO: Fehlerbehandlung
        });
    }

    async function saveCategoriesEntriesForDate(date: CalendarDate, categories: CategoryEntry[])  {
        return api.saveCategoryEntriesForDate(date.toDate(), categories).then(() => {
            if (currentDate.value.equals(date)) {
                categoryEntriesForDate.value = categories;
            }
            console.log('saveCategoriesEntriesForDate');
        }).catch(() => {
            // TODO: Fehlerbehandlung
        })
    }

    async function getCategoryEntriesForDate(date: CalendarDate) : Promise<CategoryEntry[]> {
        return api.getCategoryEntriesForDate(date.toDate()).then((entries) => {
            console.log('getCategoryEntriesForDate');
            return entries;
        }).catch(() => {
          // TODO: Fehlerbehandlung
        })
    }

    async function getLast30Days()  {
        return api.getLast30Days().then((entries) => {
            console.log('getLast30Days');
            return entries;
        }).catch(() => {
            // TODO: Fehlerbehandlung
        })
    }

    async function getTotal()  {
        return api.getTotalTime().then((entries) => {
            console.log('getTotal');
            return entries;
        }).catch(() => {
            // TODO: Fehlerbehandlung
        })
    }

    async function changeSelectedDate(date: CalendarDate) {
        currentDate.value = date;
        categoryEntriesForDate.value = await getCategoryEntriesForDate(date);
        console.log('changeSelectedDate');
    }

    return { categoriesForDate: categoryEntriesForDate,
        categories,
        saveCategoriesEntriesForDate,
        getCategoryEntriesForDate,
        changeSelectedDate,
        updateCategories,
        getLast30Days,
        getTotal,
        currentDate };
}, {
    persist: true
});
