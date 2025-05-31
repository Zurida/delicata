<script lang="ts" setup>
import type { ZodIssue } from "zod"
import type { TRegisterForm, TRegisterFormErrors } from "~/types/schemas";
import { RegisterFormSchema } from "~/types/schemas";

const initialFormData: TRegisterForm = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
};

const isLoading = ref(false);

const authFormData = ref({ ...initialFormData });
const authFormErrors = ref<TRegisterFormErrors>({});
const statusMessage = ref<string | null>(null);

let errors: ZodIssue[]


// Validation.
const validateFormData = (value: unknown): boolean => {
    const result = RegisterFormSchema.safeParse(value);
    console.log(result)
    if (!result.success) {
        errors = [...result.error.errors];
    }

    return result.success;
};

const displayErrors = () => {
    authFormErrors.value = errors.reduce((acc: Record<string, string>, error) => {
        acc[error.path[0]] = error.message;
        return acc
    }, {})
    return false;
}

async function handleSubmit() {
    console.log("onSubmit");
    isLoading.value = true;

    // Reset statusMessage.
    statusMessage.value = null;

    // Check if validation failed.
    if (!validateFormData(authFormData.value)) {
        return displayErrors();
    };

    // Reset errors if data are valid.
    authFormErrors.value = {};

    // If the validation is successful, send data to the server.
    try {

        await $fetch('/api/auth/register', {
            method: 'POST',
            body: authFormData.value
        }).then(async () => {
            await $fetch('/api/auth', {
                method: 'POST',
                body: {
                    email: authFormData.value.email,
                    password: authFormData.value.password,
                }

            })
                .then(() => {
                    window.location.replace('/')
                })
        })
            .catch(() => alert('Bad credentials'))


    } catch {
        statusMessage.value = "There was an unexpected error.";
    }
};


</script>

<template>
    <form class="auth-form" @submit.prevent="handleSubmit">
        <div class="auth-form__container">
            <CommonVInput label="Введите имя" v-model="authFormData.name" :error="authFormErrors.name">Введите
                имя</CommonVInput>
            <CommonVInput type="email" label="Введите email" :error="authFormErrors.email" v-model="authFormData.email">
            </CommonVInput>
            <CommonVInput type="password" label="Придумайте пароль" :error="authFormErrors.password"
                v-model="authFormData.password"></CommonVInput>
            <CommonVInput type="password" label="Повторите пароль" :error="authFormErrors.password_confirmation"
                v-model="authFormData.password_confirmation">
            </CommonVInput>
        </div>
        <div class="auth-form__buttons">
            <CommonVButton class="auth-form__btn" type="submit">Зарегистрироваться</CommonVButton>
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