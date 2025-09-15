<script setup>
const { clear } = useUserSession()

const clearSession = (event) => {
    clear()
    window.location.replace('/auth')


}
</script>

<template>
    <div class="user-popup">

        <UserInfo />
        <nuxt-link to="/profile">Профиль</nuxt-link>
        <AuthState v-slot="{ loggedIn, clear }">

            <a class="user-popup__logout" v-if="loggedIn" @click="clearSession">
                <IconsIconLogout></IconsIconLogout>Выйти
            </a>
        </AuthState>
    </div>
</template>

<style lang="scss" scoped>
.user-popup {
    position: absolute;
    z-index: 4;
    min-width: 18rem;
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

    .UserInfo {
        padding-top: calc(var(--gap) / 2);
        padding-right: var(--gap);
        padding-bottom: calc(var(--gap) / 2);
        border-bottom: 1px solid var(--main-3);
        font-weight: 600;
        display: none;

        @include respond-to(xs) {
            display: block;
        }
    }
}
</style>