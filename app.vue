<script setup>
const categories = useCategoryStore()
// await callOnce(categories.fetch)   // надо перенести в другое место, так как вызывается даже на странице авторизации, если делать server middleware
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