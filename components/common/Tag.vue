<script setup lang="ts">
defineProps({
    tag: {
        type: String,
        default: 'Завтрак'
    },

})
</script>

<template>
    <span class="tag">{{ tag }}</span>
</template>

<style>
.tag {
    display: inline-flex;
    flex-shrink: 0;
    margin-bottom: .6rem;
    padding: 0.6rem;
    border-radius: var(--border-radius);
    background-color: var(--main-3);
    font-size: .8rem;
    line-height: 1;
    letter-spacing: 0.05rem;
    color: var(--black-soft);
}
</style>