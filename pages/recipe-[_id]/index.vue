<script setup>
definePageMeta({
    layout: 'recipe'
})
</script>
<template>
    <div class="recipe">
        <h2 class="recipe__title">Тост с авокадо</h2>

        <div class="recipe__timing">
            <NuxtIcon name="clock" />
            <p>5-7 минут</p>
        </div>

        <div class="recipe__tags">
            <CommonTag v-for="tag in 4"></CommonTag>
        </div>

        <div class="recipe__columns">

            <div class="recipe__ingredients ingredients">
                <CommonVCheckbox /> - <div class="ingredients__mesure">50г.</div>
            </div>


            <div class="recipe__gallery">

            </div>
        </div>

        <div class="recipe__text">
            <h4>Способ приготовления:</h4>
            <ol>
                <li>В очищенную мякоть авокадо добавляем соль, перец, сок лимона, сок лайма и разминаем. </li>
            </ol>
        </div>


    </div>
</template>

<style scoped>
.recipe {
    /* background-color: var(--white-soft); */
}

.tag {
    &:not(:last-child) {
        margin-right: .4rem;
    }
}

li {
    list-style: decimal;
}
</style>