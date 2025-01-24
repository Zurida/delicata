<script setup lang="ts">
const model = defineModel<string>('model')
</script>

<template>
    <input type="text" v-model="model">
</template>