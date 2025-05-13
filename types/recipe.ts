import type { TCategory } from "./category"
import type { TUser } from './user'

type TIngrigient = {
    name: string,
    quantity: number,
    measure: null,
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