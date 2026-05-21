<script setup lang="ts">
import TheHeader from '~/components/layout/TheHeader.vue';

</script>

<template>
    <div class="default-layout">
        <TheHeader />
        <slot></slot>
    </div>
</template>

<style scoped>
.default-layout {
    padding-top: var(--header-height);
}
</style>