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
    background-color: var(--white);
    font-size: var(--fs-micro);
    line-height: 1;
    letter-spacing: 0.05rem;
    color: var(--black);
    border: .5px solid var(--main-3);
}
</style>