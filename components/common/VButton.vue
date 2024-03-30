<script setup>
defineProps({
    is: String,
    to: String
})

</script>

<template>
    <component :is="is" :to="to" class="VButton">
        <slot></slot>
    </component>
</template>

<style scoped>
.VButton {
    padding: 2rem 4rem;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1;
    background-color: var(--main-1);
    color: var(--white);
    transition: opacity .4s;
    border-radius: .5rem;

    &:hover {
        opacity: 0.9;
    }

}
</style>