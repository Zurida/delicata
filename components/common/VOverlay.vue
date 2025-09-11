<script setup lang="ts">
defineProps({
    isVisible: {
        type: Boolean,
    }
})
</script>

<template>
    <transition>
        <div class="VOverlay" v-if="isVisible">
            <slot></slot>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.VOverlay {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 3;
    background-color: rgba(0, 0, 0, 0.4);
}
</style>