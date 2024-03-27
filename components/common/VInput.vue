<script setup>
const model = defineModel()

</script>

<template>
    <div class="">
        <input v-model.trim="model" type="text" placeholder="Поиск">
    </div>
</template>

<style scoped lang="scss">
input {
    outline: none;
    border: none;
    border-radius: 0.5rem;
    padding: 1rem;
    transition: box-shadow 0.2s;

    &:focus {
        box-shadow: 0 0 0 1px var(--main-3);
    }
}
</style>