import type { TTag } from './tag'

type TIngrigient = {
    title: string,
    quantity: number | null,
    measure_id: number | null,
}

export type TRecipe = {
    id?: number,
    title: string,
    category_id: number,
    created_at?: string,
    description?: string,
    source?: string,
    tags?: TTag[],
    ingredients?: TIngrigient[],
    images?: []
}