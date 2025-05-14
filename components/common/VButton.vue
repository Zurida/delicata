<script setup>
const props = defineProps({
    to: String,
    href: String,
    small: Boolean,
    disabled: Boolean,
    type: {
        type: String,
        default() {
            return 'button'
        }
    }
})

const component = computed(() => {
    return props.to || props.href ? resolveComponent('NuxtLink') : 'button'
})


</script>

<template>
    <component :is="component" :to="to" class="VButton" :class="{ 'VButton--small': small, 'is-disabled': disabled }"
        :disabled="disabled" :type="type">
        <slot></slot>
    </component>
</template>

<style scoped lang="scss">
.VButton {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: .8rem 1rem;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: .06rem;
    background-color: var(--main-1);
    color: var(--white);
    transition: opacity .4s;
    border-radius: .5rem;
    text-align: center;

    &:hover {
        opacity: 0.9;
    }

    &.is-disabled {
        background-color: gray;
        pointer-events: none;
    }

    &--small {
        padding: .6rem .8rem;
        font-size: 1rem;
        border-radius: .3rem;
    }
}
</style>