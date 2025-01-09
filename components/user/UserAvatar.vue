<script setup lang="ts">
const props = defineProps<{
    isActive: boolean
}>()

</script>

<template>
    <div class="user-avatar" :class="{ 'is-active': isActive }">
        <IconsIconUser />
    </div>
</template>

<style>
.user-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    width: 3.8rem;
    aspect-ratio: 1;
    padding: .6rem;
    background-color: gray;
    border-radius: 10%;
    transition: all .4s;

    &:hover {
        border-radius: 50%
    }

    &.is-active {
        border-radius: 50%
    }

    svg {
        width: 100%;
        height: 100%;
    }
}
</style>