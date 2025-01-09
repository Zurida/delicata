<script setup lang="ts">

</script>

<template>
    <header class="header">
        <nuxt-link to="/" class="header__logo">
            <CommonVLogo />
            <p>DELICATA</p>
        </nuxt-link>
        <ul class="header__menu">
            <li>Доска рецептов</li>
            <li>Меню на неделю</li>
        </ul>

        <div class="header__user">
            <IconsIconUser></IconsIconUser>
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

    &__menu {
        display: flex;
        font-size: var(--text-main);
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

    &__user {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 3.8rem;
        aspect-ratio: 1;
        padding: .6rem;
        background-color: gray;
        border-radius: 50%;

        svg {
            width: 100%;
            height: 100%;
        }
    }
}
</style>