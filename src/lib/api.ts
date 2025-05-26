import {supabase} from "@/lib/supabaseClient.ts";
import type {Category} from "@/types";

export async function getAllCategories(): Promise<Category[]> {
    let { data: categories, error } = await supabase.from("category").select("*");
    if (error && !categories) {
        // TODO: Handle error appropriately
        console.error("Error fetching categories:", error);
        return [];
    }
    return categories?.map(category => ({
        id: category.id,
        name: category.name,
        color: category.color,
    })) as Category[];
}

//TODO: Create new Category (every category that has an id < 0 is a new category)
