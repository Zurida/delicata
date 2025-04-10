<template>
    <div class="user-popup">
        <nuxt-link to="/profile">Профиль</nuxt-link>
        <AuthState v-slot="{ loggedIn, clear }">

            <a class="user-popup__logout" v-if="loggedIn" @click="clear">
                <IconsIconLogout></IconsIconLogout>Выйти
            </a>
        </AuthState>
    </div>
</template>

<style lang="scss" scoped>
.user-popup {
    position: absolute;
    z-index: 4;
    min-width: 12rem;
    background-color: var(--white);
    border-radius: var(--border-radius);
    overflow: hidden;

    a {
        display: flex;
        padding: var(--gap-sm) var(--gap);
        font-size: 1.4rem;
        transition: color .2s, background-color .4s;

        &:hover {
            background-color: #2f4f4f;
            color: var(--white);
        }
    }

    &__logout {
        display: flex;
        align-items: center;

        svg {
            width: 1.4rem;
            height: 1.4rem;
            margin-right: .4rem;
        }
    }
}
</style>