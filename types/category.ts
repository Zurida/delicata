export type TCategory = {
    name: string | null,
    value: string,
    text: string | null,
}

// export type TNewCategory = {
//     name: string | null,
//     value: string,
//     text?: string 
// }

export type TExistingCategory = TCategory & { id: string }