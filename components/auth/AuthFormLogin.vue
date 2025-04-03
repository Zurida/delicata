<script lang="ts" setup>
import type { ZodIssue } from "zod"
import type { TAuthForm, TAuthFormErrors } from "~/types/schemas";
import { AuthFormSchema } from "~/types/schemas";

const initialFormData: TAuthForm = {
    password: "",
    email: "",
};

const isLoading = ref(false);
const router = useRouter();


const authFormData = ref({ ...initialFormData });
const authFormErrors = ref<TAuthFormErrors>({});
const statusMessage = ref<string | null>(null);

let errors: ZodIssue[]


// Validation.
const validateFormData = (value: unknown): boolean => {
    const result = AuthFormSchema.safeParse(value);

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

const onSubmit = async () => {
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

        const res = await $fetch('/api/auth/login', {
            method: 'POST',
            body: authFormData.value
        })

        console.log(res)
        // await $fetch('/api/login', {
        //     method: 'POST',
        //     body: authFormData.value
        // })
        //     .then(async () => {
        //         await navigateTo('/')
        //     })
        //     .catch(() => alert('Bad credentials'))

        // Response handling.
        // const result = await response.json();
        // statusMessage.value = result.message;

        // Reset the form values.
        // if (result.statusCode === 200) {
        //     authFormData.value = { ...initialFormData };
        // }
    } catch {
        statusMessage.value = "There was an unexpected error.";
    }
};


</script>

<template>
    <form class="auth-form" @submit.prevent="onSubmit">
        <div class="auth-form__container">
            <CommonVInput id="email" label="Email" :error="authFormErrors.email" v-model="authFormData.email">Введите
                почту
            </CommonVInput>
            <CommonVInput id="password" label="Пароль" type="password" :error="authFormErrors.password"
                v-model="authFormData.password">
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