import { z } from "zod";

export const AuthFormSchema = z.object({
    email: z.string().email('Некорректный формат почты'),
    password: z.string().min(3, { message: 'Введите не менее 3 символов' })
});

export type TAuthForm = z.infer<typeof AuthFormSchema>
export type TAuthFormErrors = Partial<Record<keyof TAuthForm, string>> // each field is made optional using Partial<>
