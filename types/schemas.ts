import { z } from "zod";

export const AuthFormSchema = z.object({
    name: z.string().min(3, { message: 'Введите не менее 3 символов' }),
    email: z.string().email(),
});

export type FormData = z.infer<typeof AuthFormSchema>
export type FormErrors = Partial<Record<keyof FormData, string>>
