import type { TIngredient } from './ingredient'
import type { TTag } from './tag'


export type TRecipe = {
    id?: number,
    title: string,
    category_id: number,
    created_at?: string,
    description?: string,
    source?: string,
    tags?: TTag[],
    ingredients?: TIngredient[],
    images?: []
}