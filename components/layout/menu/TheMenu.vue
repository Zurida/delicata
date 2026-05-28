<script setup lang="ts">
import TheMenuItem from './TheMenuItem.vue';

const currentId = ref(0);

const MENU = [
    {
        id: 0,
        title: 'Доска рецептов',
        link: '/',
        icon: '',
    },

    {
        id: 1,
        title: 'Меню на неделю',
        link: '/meal-planner',
        icon: '',
    },

]
</script>

<template>
    <Transition mode="out-in">
        <ul class="header__menu menu">
            <TheMenuItem
                v-for="item in MENU"
                :key="`menuItem-${item.id}`"
                :item="item"
                :is-active="item.id === currentId"
                @click="currentId = item.id"
            ></TheMenuItem>
        </ul>

        <!-- <ul class="header__menu menu" v-else>
                <li class="menu__item"><nuxt-link to="/" class="menu__link">
                        <IconsIconLeft class="menu__back" />
                        <p>Вернуться к рецептам</p>
                    </nuxt-link></li>
                <li>Меню на неделю</li>
            </ul> -->
    </Transition>
</template>

<style lang="scss"></style>