import { defineStore } from 'pinia';
import { ref } from 'vue';
import type {Category, CategoryEntry, DonutData} from "@/types";
import {
    CalendarDate
} from "@internationalized/date";
import useApi from "@/lib/api";

export const useStore = defineStore('store', () => {
    const api = useApi();

    const currentDate = ref<CalendarDate>(
        new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate()));
    const categories = ref<Category[]>([] as Category[]);
    const categoryEntriesForDate = ref<CategoryEntry[]>([]);

    // Summaries for the donut chart
    const categoryEntriesLast30Days = ref<DonutData[]>([]);
    const categoryEntriesTotalTime = ref<DonutData[]>([]);

    async function init() {
        currentDate.value = new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
        await Promise.all([
            setCategoryEntriesForDate(currentDate.value),
            setCategories(),
            refreshSummaryStatistics()
        ]);
    }

    async function setCategories() : Promise<Category[]> {
        categories.value = await api.getAllCategories();
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
        if (date) {
            categoryEntriesForDate.value = await api.getCategoryEntriesForDate(date.toString());
        }
    }

    async function getCategoryEntriesForDate(date: CalendarDate) : Promise<CategoryEntry[]> {
        return await api.getCategoryEntriesForDate(date.toString())
    }

    async function refreshSummaryStatistics() {
        await api.getSummaryStatistics().then(summary => {
            if (summary.last30Days.length === 0 || summary.total.length === 0) {
                categoryEntriesLast30Days.value = [] as DonutData[];
                categoryEntriesTotalTime.value = [] as DonutData[];
            } else {
                categoryEntriesLast30Days.value = summary.last30Days.map((entry) => ({
                    id: entry.id,
                    name: entry.name,
                    total: entry.total,
                    color: categories.value.find(cat => cat.id === entry.id)?.color ?? '#000000' // Default color if not found
                })) as DonutData[];
                categoryEntriesTotalTime.value = summary.total.map((entry) => ({
                    id: entry.id,
                    name: entry.name,
                    total: entry.total,
                    color: categories.value.find(cat => cat.id === entry.id)?.color ?? '#000000' // Default color if not found
                })) as DonutData[];
            }
        });
    }

    async function changeSelectedDate() {
        await setCategoryEntriesForDate(currentDate.value);
    }

    return { categoryEntriesForDate,
        categories,
        setCategories,
        saveCategoriesEntriesForDate,
        getCategoryEntriesForDate,
        setCategoryEntriesForDate,
        init,
        changeSelectedDate,
        refreshSummaryStatistics,
        categoryEntriesLast30Days,
        categoryEntriesTotalTime,
        currentDate };
    }, {
    persist: true
});
