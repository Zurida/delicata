import { z } from "zod";

export const AuthFormSchema = z.object({
    email: z.string().email('Некорректный формат почты'),
    password: z.string().min(4, { message: 'Введите не менее 4 символов' })
});


export const RegisterFormSchema = z.object({
    name: z.string().min(3, { message: 'Введите не менее 3 символов' }),
    email: z.string().email('Некорректный формат почты'),
    password: z.string().min(4, { message: 'Введите не менее 4 символов' }),
    password_confirmation: z.string().min(4, { message: 'Введите не менее 4 символов' }),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Пароли не совпадают",
});;


export type TAuthForm = z.infer<typeof AuthFormSchema>
export type TRegisterForm = z.infer<typeof RegisterFormSchema>

export type TAuthFormErrors = Partial<Record<keyof TAuthForm, string>> // each field is made optional using Partial<>
export type TRegisterFormErrors = Partial<Record<keyof TRegisterForm, string>> // each field is made optional using Partial<>
