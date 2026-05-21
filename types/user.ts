export type TUser = {
    name: string,
    email: string,
    isAdmin?: boolean,
}

export type TNewUser = {
    name: string,
    email: string,
    password: string
    password2: string
}