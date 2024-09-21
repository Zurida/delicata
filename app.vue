<script setup>
const menu = useMenuStore()
await callOnce(menu.fetch)
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
