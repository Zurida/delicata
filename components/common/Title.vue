<script setup>
defineProps({
    title: String
})
</script>

<template>
    <h1 class="title">{{ title }}</h1>
</template>

<style lang="scss" scoped>
.title {
    font-size: 2.6rem;
}
</style>