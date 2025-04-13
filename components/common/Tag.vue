<script setup lang="ts">
import type { TTag } from '~/types/tag';

defineProps<{
    tag?: TTag,
    isActive?: boolean

}>()
</script>

<template>
    <span class="tag" @click="$emit('click')" :class="{ 'is-active': isActive }">{{ tag }}</span>
</template>

<style>
.tag {
    display: inline-flex;
    flex-shrink: 0;
    padding: calc(var(--gap-sm) / 1.2);
    border-radius: var(--border-radius);
    background-color: var(--white);
    font-size: var(--fs-micro);
    line-height: 1;
    letter-spacing: 0.05rem;
    color: var(--black);
    border: .5px solid var(--main-3);
    cursor: pointer;
    transition: color .2s, background-color .2s, border-color .2s;

    &:hover {
        background-color: var(--main-1);
        color: var(--white);
        border-color: var(--main-1);
    }

    &.is-active {
        background-color: var(--main-1);
        color: var(--white);
        border-color: var(--main-1);
        font-weight: 600;
    }
}
</style>