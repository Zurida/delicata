import type { TCategory } from "./category"
import type { TUser } from './user'

type TIngrigient = {
    title: string,
    quantity: number | null,
    measure_id: number | null,
}

export type TRecipe = {
    title: string,
    category_id: number,
    description?: string,
    source?: string,
    tags?: [],
    ingredients?: TIngrigient[],
    images?: []
}