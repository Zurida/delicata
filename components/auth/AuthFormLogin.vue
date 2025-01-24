<script lang="ts" setup>
import { z } from "zod";
import type { TAuthForm, TAuthFormErrors } from "~/types/schemas";
import { AuthFormSchema } from "~/types/schemas";

const initialFormData: TAuthForm = {
    password: "",
    email: "",
};

const authFormData = ref<TAuthForm>({ ...initialFormData });
const authFormErrors = ref<TAuthFormErrors>({});
const statusMessage = ref<string | null>(null);

// Validation.
const validateFormData = (): boolean => {
    // Parse form data without throwing an error.
    const result: z.SafeParseReturnType<TAuthForm, TAuthForm>
        = AuthFormSchema.safeParse(authFormData.value);

    // Debug: Log validation results client-side.
    // console.log("Results client: ", result);

    // Display errors.
    if (!result.success) {
        authFormErrors.value = result.error.errors.reduce((acc: TAuthFormErrors, error: any) => {
            const key = error.path[0] as keyof TAuthForm;
            acc[key] = error.message;
            return acc
        }, {} as TAuthFormErrors)
        return false;
    }

    // Reset errors if data are valid.
    authFormErrors.value = {};
    return true;
};

// Handle form submission.
const onSubmit = async () => {
    // Reset statusMessage.
    statusMessage.value = null;

    // Check if validation failed.
    if (!validateFormData()) return;

    // If the validation is successful, send data to the server.
    try {
        const response: Response = await fetch("https://kavkaz-build.ru/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(authFormData.value)
        });

        // Response handling.
        const result = await response.json();
        statusMessage.value = result.message;

        // Reset the form values.
        if (result.statusCode === 200) {
            authFormData.value = { ...initialFormData };
        }
    } catch {
        statusMessage.value = "There was an unexpected error.";
    }
};


</script>

<template>
    <form class="auth-form" @submit.prevent="onSubmit">
        {{ authFormData }}

        <CommonEmptyInput v-model="authFormData.email"></CommonEmptyInput>
        <div class="auth-form__container">
            <CommonVInput id="email" label="Email" :error="authFormErrors.email" v-model="authFormData.email">Введите
                почту
            </CommonVInput>
            <CommonVInput id="password" label="Пароль" :error="authFormErrors.password" v-model="authFormData.password">
                Введите пароль
            </CommonVInput>
        </div>
        <div class="auth-form__buttons">
            <CommonVButton class="auth-form__btn" type="submit">Войти</CommonVButton>
        </div>
    </form>
</template>

<style scoped lang="scss">
.auth-form {
    &__buttons {
        position: relative;
        z-index: 2;
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }

    &__btn {
        &:last-child {
            margin-left: 2rem;
        }
    }
}

.VInput {
    margin-bottom: var(--gap);
}
</style>