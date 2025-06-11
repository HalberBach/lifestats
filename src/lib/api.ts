import {supabase} from "@/lib/supabaseClient.ts";
import type {Category} from "@/types";

export default function useApi() {
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

    return {
        getAllCategories,
        addCategories,
        updateCategories,
        setCategoriesDeleted
    }
}