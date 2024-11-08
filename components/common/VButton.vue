<script setup>
const props = defineProps({
    small: Boolean,
    disabled: Boolean,
})



</script>

<template>
    <button class="VButton" :class="{ 'VButton--small': small, 'is-disabled': disabled }" :disabled="disabled">
        <slot></slot>
    </button>
</template>

<style scoped lang="scss">
.VButton {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 4rem;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1;
    background-color: var(--main-1);
    color: var(--white);
    transition: opacity .4s;
    border-radius: .5rem;
    text-align: center;

    &:hover {
        opacity: 0.9;
    }

    &--small {
        font-size: 1rem;
        padding: 1rem 2rem;
    }

    &.is-disabled {
        background-color: gray;
        pointer-events: none;
    }
}
</style>