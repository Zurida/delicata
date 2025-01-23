<template>
    <div class="auth-form">
        <div class="auth-form__container">
            <CommonVInput type="text" label="Email">Введите почту</CommonVInput>
            <CommonVInput type="text" label="Пароль">Введите пароль</CommonVInput>
        </div>
        <div class="auth-form__buttons">
            <CommonVButton to="/" class="auth-form__btn">Войти</CommonVButton>
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