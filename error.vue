<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps({
    error: Object as () => NuxtError
})

const myError = computed(() => {
    const err = props.error
    if (err) {
        return err?.statusCode === 404 ? 'Такой страницы не существует' : `...Ошибка
            ${err.statusCode}...`
    }
})
</script>

<template>
    <div class="error">
        <h2> {{ myError }}</h2>
        <img src="/assets/img/chef.png" alt="">
        <NuxtLink to="/">На главную</NuxtLink>
    </div>
</template>

<style lang="scss" scoped>
.error {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    height: 100vh;
    font-size: 5rem;
    text-align: center;
    line-height: 1;

    img {
        width: 30rem;
        height: auto;
    }

    a {
        color: var(--main-1);
        transition: 0.2s color linear;

        @include hover {
            color: darkcyan;
        }
    }
}
</style>