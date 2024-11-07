export type TCategory = {
    value: string,
    text: string | null,
}

export type TExistingCategory = TCategory & { id: string }