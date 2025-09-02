type TypedKeys<T> = {
    [P in keyof T]: P
}[keyof T][];

export function getTypedKeys<T extends Record<string, any>>(obj: T): TypedKeys<T> {
    return Object.keys(obj);
}


export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'long' }).format(date);
}