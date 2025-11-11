<script setup>
const { fetchCategories } = useCategoryStore()
const { fetchMeasures } = useMeasureStore()

fetchCategories()
fetchMeasures()

</script>

<template>
    <div class="default-layout">
        <LayoutHeader />
        <slot></slot>
    </div>
</template>

<style scoped>
.default-layout {
    padding-top: var(--header-height);
}
</style>