<template>
    <div class="auth-form">
        <div class="auth-form__container">
            <CommonVInput label="Введите имя">Введите имя</CommonVInput>
            <CommonVInput label="Введите email"></CommonVInput>
            <CommonVInput label="Придумайте пароль"></CommonVInput>
        </div>
        <div class="auth-form__buttons">
            <CommonVButton to="/" class="auth-form__btn">Зарегистрироваться</CommonVButton>
        </div>
    </div>
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