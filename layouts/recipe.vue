<template>
    <div class="recipe">

        <div class="recipe-link">
            <NuxtLink to="/" class="recipe__link">
                <nuxt-icon name="arrow-left" class="arrow-left"></nuxt-icon>
                Вернуться на доску
            </NuxtLink>
        </div>
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
.recipe {
    min-height: 100vh;
    background-color: var(--white);

    &-link {
        max-width: 80rem;
        margin-inline: auto;
        font-size: var(--fs-base);
        font-weight: 500;
        color: var(--main-2);
        transition: color .4s;

        &:hover {
            color: #457e57;
        }
    }
}

.arrow-left {
    margin-right: .4rem;
}
</style>