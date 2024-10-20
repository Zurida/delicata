import type { TCategory } from "./category"
import type { TUser } from './user'

type TIngrigient = {
    name: string,
    quantity: number,
    measure: null,
}

export type TRecipe = {
    author?: TUser,
    category: string,
    title: string,
    ingridients: TIngrigient[],
    description: string,
    images?: []
}