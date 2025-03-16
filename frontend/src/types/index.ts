export interface Category {
    id: number
    name: string
    color: string
}

export interface CategoryEntry {
    id: number
    name: string
    color: string
    categoryId: number
    date: string
    time: number
}