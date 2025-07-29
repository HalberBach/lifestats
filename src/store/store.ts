import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {Category, CategoryEntry} from "@/types";
import {CalendarDate} from "@internationalized/date";
import useApi from "@/lib/api";

export const useStore = defineStore('store', () => {
    const api = useApi();

    const currentDate = ref<CalendarDate>(new CalendarDate(2025, 3, 3));
    const categories = ref<Category[]>([] as Category[]);

    const categoryEntriesForDate = ref<CategoryEntry[]>([]);

    async function init() {
        await Promise.all([
            setCategoryEntriesForDate(currentDate.value),
            api.getAllCategories().then(categories_ => {
                categories.value = categories_;
            })
        ]);
    }

    async function saveCategoriesEntriesForDate(date: CalendarDate, categories: CategoryEntry[])  {
        await Promise.all([
            api.createCategoryEntriesForDate(date.toString(), categories.filter(entry => entry.id === 0)),
            api.updateCategoryEntriesForDate(categories.filter(entry => entry.id > 0))
        ]);
        if (date.compare(currentDate.value) === 0) {
            await setCategoryEntriesForDate(date);
        }
    }

    async function setCategoryEntriesForDate(date: CalendarDate) : Promise<CategoryEntry[]> {
        categoryEntriesForDate.value = await api.getCategoryEntriesForDate(date.toString())
    }

    async function getCategoryEntriesForDate(date: CalendarDate) : Promise<CategoryEntry[]> {
        return await api.getCategoryEntriesForDate(date.toString())
    }

    async function getLast30Days()  {
/*        return api.getLast30Days().then((entries) => {
            console.log('getLast30Days');
            return entries;
        }).catch(() => {
            // TODO: Fehlerbehandlung
        })*/
    }

    async function getTotal()  {
/*        return api.getTotalTime().then((entries) => {
            console.log('getTotal');
            return entries;
        }).catch(() => {
            // TODO: Fehlerbehandlung
        })*/
    }

    async function changeSelectedDate(date: CalendarDate) {
        currentDate.value = date;
        await setCategoryEntriesForDate(date);
        console.log('changeSelectedDate');
    }

    return { categoryEntriesForDate,
        categories,
        saveCategoriesEntriesForDate,
        getCategoryEntriesForDate,
        init,
        changeSelectedDate,
        getLast30Days,
        getTotal,
        currentDate };
    }, {
    persist: true
});
