import {supabase} from "@/lib/supabaseClient.ts";
import type {Category, CategoryEntry, DonutData} from "@/types";
import {minutesToHours} from "@/utils/utils.ts";

export default function useApi() {
    /**
     * Fetches all categories from the database.
     *
     * @returns {Promise<Category[]>} A promise that resolves to an array of categories.
     */
    async function getAllCategories(): Promise<Category[]> {
        let { data: categories, error } = await supabase.from("category")
            .select("*")
            .eq('deleted', false);
        if (error && !categories) {
            console.error("Error fetching categories:");
            return [];
        }
        return categories?.map(category => ({
            id: category.id,
            name: category.name,
            color: category.color,
        })) as Category[];
    }

    /**
     * Adds new categories to the database.
     *
     * @param categories
     */
    async function addCategories(categories: Category[]) : Promise<boolean> {
        await Promise.all(categories.map(async (category) => {
            const { data, error } = await supabase
                .from('category')
                .insert([
                    { name: category.name, color: category.color, deleted: false },
                ])

            if (error) {
                console.error("Error creating category:", error);
                return false;
            }
        }));

        return true;
    }

    /**
     * Updates existing categories in the database.
     *
     * @param {Category[]}
     */
    async function updateCategories(categories: Category[]) : Promise<boolean> {
        await Promise.all(categories.map(async (category) => {
            const { data, error } = await supabase
                .from('category')
                .update({ 'name': category.name, 'color': category.color })
                .eq('id', category.id)
                .select()

            if (error) {
                console.error("Error updating category:", error);
                return false;
            }
        }));

        return true;
    }

    /**
     * Marks categories as deleted in the database.
     *
     * @param ids - Array of category IDs to mark as deleted.
     */
    async function setCategoriesDeleted(ids: number[]) : Promise<boolean> {
        await Promise.all(ids.map(async (id) => {
            const { data, error } = await supabase
                .from('category')
                .update({ 'deleted': true })
                .eq('id', id)

            if (error) {
                console.error("Error deleting category:", error);
                return false;
            }
        }));

        return true;
    }

    /**
     * Fully deletes categories from the database. (Entries will also be deleted)
     *
     * @param ids - Array of category IDs to fully delete.
     */
    async function fullyDeleteCategories(ids: number[]){
        await Promise.all(ids.map(async (id) => {
            const { data, error } = await supabase
                .from('category')
                .delete()
                .eq('id', id)

            if (error) {
                console.error("Error fully deleting categories:", error);
                return false;
            }
        }));

        return true;
    }

    /**
     * Fetches category entries for a specific date.
     *
     * @param {string}
     */
    async function getCategoryEntriesForDate(date: string): Promise<Category[]> {
        const { data: categories, error } = await supabase
            .from('category_entry')
            .select('id, time, category (name, color)')
            .eq('date', date)
            //.eq('deleted', false);

        if (error) {
            console.error("Error fetching category entries for date:", error);
            return [];
        }

        if (!categories || categories.length === 0) {
            return [] as CategoryEntry[];
        }
        return categories.map(category => ({
            id: category.id,
            categoryId: category.category.id,
            name: category.category.name,
            color: category.category.color,
            time: category.time || 0,
        })).sort(
(a, b) => a.name.localeCompare(b.name)
        ) as CategoryEntry[];
    }

    /**
     * Sets / Updates the time for category entries for a specific date.
     *
     * @param categoryEntries
     */
    async function updateCategoryEntriesForDate(categoryEntries: CategoryEntry[]) : Promise<CategoryEntry[]> {
        const updatedEntries: CategoryEntry[] = [];

        await Promise.all(categoryEntries.map(async (entry) => {
            const { data, error } = await supabase
                .from('category_entry')
                .update({ 'time': entry.time })
                .eq('id', entry.id)
                .select('id, time, category (name, color)')

            if (error) {
                console.error("Error updating category: (reload site)", error);
                return [];
            } else if (data && data.length > 0) {
                updatedEntries.push({
                    id: data[0].id,
                    name: data[0].category.color,
                    color: data[0].category.color,
                    time: data[0].time || 0,
                });
            }
        }));

        updatedEntries.sort((a, b) => a.name.localeCompare(b.name));
        return updatedEntries;
    }

    /**
     * Creates new category entries for a specific date
     *
     * @params date, categories
     */
    async function createCategoryEntriesForDate(date: string, categories: CategoryEntry[]) : Promise<CategoryEntry[]> {
        await Promise.all(categories.map(async (entry) => {
            const { data, error } = await supabase
                .from('category_entry')
                .insert([{ date: date, time: entry.time, category_id: entry.categoryId }])

            if (error) {
                console.error("Error creating category entry:", error);
            }
        }));
    }

    /**
     * Fetches the summary statistics for the last 30 days and all time.
     */
    async function getSummaryStatistics() {
        const { data, error } = await supabase
            .from('value_summaries')
            .select('*');

        if (error) {
            console.error('Error fetching summary statistic:', error);
        } else {
            const last30Days: DonutData[] = [];
            const total: DonutData[] = [];

            data?.forEach((row => {
                last30Days.push({
                    id: row.category_id,
                    name: row.category_name,
                    total: minutesToHours(row.sum_last_30_days),
                });
                total.push({
                    id: row.category_id,
                    name: row.category_name,
                    total: minutesToHours(row.sum_all_time),
                });
            }));
            return {
                last30Days,
                total,
            }
        }
    }

    return {
        getAllCategories,
        addCategories,
        updateCategories,
        setCategoriesDeleted,
        fullyDeleteCategories,
        getCategoryEntriesForDate,
        updateCategoryEntriesForDate,
        createCategoryEntriesForDate,
        getSummaryStatistics,
    }
}