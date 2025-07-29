export interface Category {
    id: number
    name: string
    color: string
}

export interface CategoryEntry {
    id: number
    categoryId: number // to link to Category
    name: string
    color: string
    time: number
}