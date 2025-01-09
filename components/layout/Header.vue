<script setup lang="ts">
const isActive = ref(false);

function handleClick() {
    isActive.value = !isActive.value
}
</script>

<template>
    <header class="header">
        <Transition>
            <div class="header__overlay" @click="isActive = false" v-if="isActive"></div>
        </Transition>
        <nuxt-link to="/" class="header__logo">
            <CommonVLogo />
            <p>DELICATA</p>
        </nuxt-link>
        <ul class="header__menu">
            <li>Доска рецептов</li>
            <li>Меню на неделю</li>
        </ul>


        <div class="header__user">
            <UserInfo />
            <UserAvatar @click="handleClick" :is-active="isActive" />
            <Transition>
                <UserPopup v-if="isActive"></UserPopup>
            </Transition>
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    position: fixed;
    width: 100%;
    z-index: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--gap);
    height: var(--header-height);
    background-color: var(--white);
    box-shadow: 0 11px 7px -11px rgb(37, 37, 37);

    &__logo {
        display: flex;
        align-items: center;
        font-size: 2.4rem;

        svg {
            width: 3.2rem;
            margin-right: .8rem;
        }

        p {
            font-weight: 300;
        }
    }

    &__menu {
        display: flex;
        font-size: var(--fs-base);
        gap: 1rem;
        font-size: 1.8rem;
        text-transform: uppercase;

        li {
            cursor: pointer;
            transition: color .4s;

            &:hover {
                color: var(--main-1);
            }
        }
    }

    &__user {
        position: relative;
        display: flex;
        align-items: center;

        .user-avatar {
            flex: none;
            margin-left: 1rem;
        }
    }

    .user-popup {
        top: 120%;
        right: 0;
    }

    &__overlay {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
    }
}
</style>