<template>
    <div class="recipe">

        <div class="recipe-link">
            <NuxtLink to="/" class="recipe__link">
                <nuxt-icon name="arrow-left"></nuxt-icon>
                Вернуться на доску
            </NuxtLink>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.recipe {
    min-height: 100vh;
    padding: 0 1.5rem;
    background-color: var(--white-soft);

    &__link {
        font-size: 2rem;
        font-weight: 600;
        margin-bottom: 4.8rem;
        color: var(--main-2);
        transition: color .4s;

        &:hover {
            color: #457e57;
        }
    }
}
</style>