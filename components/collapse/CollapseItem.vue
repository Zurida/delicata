<script setup lang="ts">
type ListItem = {
    id: number,
    name: string
}

const props = defineProps<{
    item: ListItem,
}>()

const emit = defineEmits<{
    (e: 'click'): void
}>()
</script>


<template>
    <li @click="emit('click')">{{ item.name }}</li>
</template>

<style scoped>
li {
    padding: calc(var(--gap-small) / 3) 0;
    transition: color 0.4s;

    &.is-active {
        color: var(--main-3)
    }

    &:hover {
        cursor: pointer;
        opacity: 0.8;
    }
}
</style>