export type TCategory = {
    value?: string,
    title: string,
    text: string | null,
}

export type TExistingCategory = TCategory & { id: number }