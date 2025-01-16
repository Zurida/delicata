<script setup lang="ts">
import VOverlay from '../common/VOverlay.vue';

const isActive = ref(false);

function handleClick() {
    isActive.value = !isActive.value
}
</script>

<template>
    <header class="header">
        <Transition>
            <VOverlay @click="isActive = false" v-if="isActive" />
        </Transition>
        <nuxt-link to="/" class="header__logo">
            <CommonVLogo :is-animated="false" />
            <p>DELICATA</p>
        </nuxt-link>
        <ul class="header__menu menu">
            <li class="menu__item is-active">Доска рецептов</li>
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
    top: 0;
    left: 0;
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

            &.is-active {
                color: var(--main-1);
            }
        }
    }

    &__user {
        position: relative;
        display: flex;
        align-items: center;

        .UserInfo {
            position: relative;
            z-index: 1;
        }

        .user-avatar {
            flex: none;
            margin-left: 1rem;
        }
    }

    .user-popup {
        top: 120%;
        right: 0;
    }
}
</style>