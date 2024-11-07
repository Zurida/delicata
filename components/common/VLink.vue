<script setup>
defineProps({
    to: String
})
</script>

<template>
    <NuxtLink :to="to">
        <slot></slot>
    </NuxtLink>
</template>