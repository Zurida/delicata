<script setup lang="ts">
const isActive = ref(false);

function handleClick() {
    isActive.value = !isActive.value
}

const route = useRoute();
</script>

<template>
    <header class="header">
        <CommonVOverlay :is-visible="isActive" @click="isActive = false" />
        <nuxt-link to="/" class="header__logo">
            <CommonVLogo :is-animated="false" />
            <p>DELICATA</p>
        </nuxt-link>
        <Transition mode="out-in">
            <ul class="header__menu menu" v-if="route.path === '/'">
                <li class="menu__item is-active"><nuxt-link to="/">Доска рецептов</nuxt-link></li>
                <!-- <li>Меню на неделю</li> -->
            </ul>

            <ul class="header__menu menu" v-else>
                <li class="menu__item"><nuxt-link to="/" class="menu__link">
                        <IconsIconLeft class="menu__back" />
                        <p>Вернуться к рецептам</p>
                    </nuxt-link></li>
                <!-- <li>Меню на неделю</li> -->
            </ul>
        </Transition>

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
    z-index: 20;
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

            @include respond-to (xs) {
                display: none;
            }
        }
    }

    &__menu {
        display: flex;
        font-size: var(--fs-base);
        gap: 1rem;
        font-size: 1.8rem;
        text-transform: uppercase;

        @include respond-to(xs) {
            font-size: 1.4rem;
        }

        a {
            transition: color .4s;
        }

        p {
            line-height: 1;
            margin-top: 2px;
        }

        li {
            @include hover() {
                a {
                    color: var(--main-1);
                }
            }

            @include respond-to(sm) {
                a {
                    color: var(--main-1);
                }
            }

            &.is-active {
                a {
                    color: var(--main-1);
                }
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

            @include respond-to(sm) {
                display: none;
            }
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

.menu {
    &__link {
        display: flex;
        align-items: center;
    }

    &__back {
        width: 2rem;
        margin-right: .6rem;
    }
}
</style>