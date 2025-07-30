import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {Category, CategoryEntry, DonutData} from "@/types";
import {CalendarDate} from "@internationalized/date";
import useApi from "@/lib/api";

export const useStore = defineStore('store', () => {
    const api = useApi();

    const currentDate = ref<CalendarDate>(new CalendarDate(2025, 3, 3));
    const categories = ref<Category[]>([] as Category[]);
    const categoryEntriesForDate = ref<CategoryEntry[]>([]);

    // Summaries for the donut chart
    const categoryEntriesLast30Days = ref<DonutData[]>([]);
    const categoryEntriesTotalTime = ref<DonutData[]>([]);

    async function init() {
        await Promise.all([
            setCategoryEntriesForDate(currentDate.value),
            api.getAllCategories().then(categories_ => {
                categories.value = categories_;
            }),
            refreshSummaryStatistics()
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
        await refreshSummaryStatistics();
    }

    async function setCategoryEntriesForDate(date: CalendarDate) : Promise<CategoryEntry[]> {
        categoryEntriesForDate.value = await api.getCategoryEntriesForDate(date.toString())
    }

    async function getCategoryEntriesForDate(date: CalendarDate) : Promise<CategoryEntry[]> {
        return await api.getCategoryEntriesForDate(date.toString())
    }

    async function refreshSummaryStatistics() {
        await api.getSummaryStatistics().then(summary => {
            categoryEntriesLast30Days.value = summary.last30Days.map((entry) => ({
                id: entry.id,
                name: entry.name,
                total: entry.total,
                color: categories.value.find(cat => cat.id === entry.id)?.color || '#000000' // Default color if not found
            })) as DonutData[];
            categoryEntriesTotalTime.value = summary.total.map((entry) => ({
                id: entry.id,
                name: entry.name,
                total: entry.total,
                color: categories.value.find(cat => cat.id === entry.id)?.color || '#000000' // Default color if not found
            })) as DonutData[];
        });
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
        categoryEntriesLast30Days,
        categoryEntriesTotalTime,
        currentDate };
    }, {
    persist: true
});
