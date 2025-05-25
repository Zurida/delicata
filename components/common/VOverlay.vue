<script setup lang="ts">
defineProps({
    isVisible: {
        type: Boolean,
    }
})
</script>

<template>
    <transition>
        <div v-if="isVisible" class="VOverlay">
            <slot></slot>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.VOverlay {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
}
</style>