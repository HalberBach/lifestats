import {supabase} from "@/lib/supabaseClient.ts";
import type {Category, CategoryEntry} from "@/types";

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
            // TODO: Handle error appropriately
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
     * @param {Category[]}
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
            console.log("Updating category:", category);
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
     * @param {number[]}
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

        return categories?.map(category => ({
            id: category.id,
            name: category.category.color,
            color: category.category.color,
            time: category.time || 0,
        })) as CategoryEntry[];
    }

    return {
        getAllCategories,
        addCategories,
        updateCategories,
        setCategoriesDeleted,
        getCategoryEntriesForDate
    }
}