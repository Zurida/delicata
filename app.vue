<script setup lang="ts">
const categoriesStore = useCategoryStore()
const measuresStore = useMeasureStore()
const tagsStore = useTagsStore()


await useAsyncData('categoriesData', async () => {
  await categoriesStore.fetchCategories();
  return categoriesStore.categories
});

await useAsyncData('measuresData', async () => {
  await measuresStore.fetchMeasures();
  return measuresStore.measures
});

await useAsyncData('tagsData', async () => {
  await tagsStore.fetchTags();
  return tagsStore.tags
});
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>


<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.4s;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>