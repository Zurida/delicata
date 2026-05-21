<script setup lang="ts">
type MenuItem = {
    id: number,
    title: string,
    link: string,
    icon?: string,
}

defineProps<{
    item: MenuItem,
    isActive?: boolean,
}>()
</script>

<template>
    <li
        class="menu__item"
        :class="{ 'is-active': isActive }"
    >
        <nuxt-link
            :to="item?.link"
            @click="$emit('click')"
        >{{ item?.title }}</nuxt-link>
    </li>
</template>

<style lang="scss" scoped>
.menu__item {
    a {
        transition: color .2s;

        &:not(.router-link-exact-active):hover {
            color: var(--main-1);
        }
    }
}

.router-link-exact-active {
    color: var(--main-1);
}
</style>