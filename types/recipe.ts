import type { TIngredient } from './ingredient'
import type { TTag } from './tag'

interface IRecievedFile {
    id: number,
    url: string,
    name: string
}

export type TImage = IRecievedFile | File


export type TRecipe = {
    id?: number,
    title: string,
    category_id: number,
    category?: {
        id: number,
        title: string
    },
    created_at?: string,
    description?: string,
    source?: string,
    tags?: TTag[],
    ingredients?: TIngredient[],
    images?: TImage[],
    main_image?: {}
}