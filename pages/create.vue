<script setup lang="ts">
definePageMeta({
    layout: 'recipe'
})

function sendForm() {
    // console.log(params)
}

const options = [{ id: 0, value: 'breakfast', text: 'Завтраки', name: 'categories' }, { id: 1, value: 'dinner', text: 'Ужин', name: 'categories' }]

const measures = [{ id: 0, value: 'мл', text: 'мл', name: 'measure' }, { id: 1, value: 'г', text: 'г', name: 'measure' }]


const recipe = reactive({
    category: "",
    title: "",
    ingridient: "",
    measure: "",
    description: "",
    images: []
});


</script>

<template>
    <div class="container">
        <CommonTitle title="Добавить рецепт" class="create__title" />


        <form class="form" @submit.prevent="sendForm">
            <div class="form__item">
                <h3>Категория</h3>
                {{ recipe }}
                <CommonVSelect :options="options" v-model="recipe.category" />

            </div>

            <div class="form__item">
                <h3>Заголовок</h3>
                <CommonVInput v-model="recipe.title" placeholder="Введите заголовок"> </CommonVInput>
            </div>

            <div class="form__item ingridients">
                <h3>Инргидиенты</h3>

                <div class="ingridients__list">
                    <div class="ingridients__item">
                        <CommonVInput v-model="recipe.ingridient" placeholder="Введите ингридиент">
                        </CommonVInput> -
                        <CommonVSelect :options="measures" v-model="recipe.measure" class="ingridients__select" />
                    </div>
                </div>

                <CommonVButton small>Добавить Инргидиент</CommonVButton>
            </div>

            <div class="form__item">
                <h3>Способ приготовления</h3>
                <CommonVTextarea placeholder="Введите текст" id="steps"></CommonVTextarea>
            </div>

            <div class="form__item">
                <span>+</span>
                <p>Добавить фото</p>
            </div>

            <CommonVButton small>Сохранить</CommonVButton>

        </form>
    </div>
</template>

<style lang="scss">
.create {
    &__title {
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
}

.form {
    &__item {
        margin-bottom: 1rem;
    }
}

h3 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 600;
}

.ingridients {
    width: 100%;

    &__list {
        margin-bottom: 1rem;
    }

    &__item {
        display: flex;
        align-items: center;
        gap: .5rem;
        width: 100%;
    }

    &__select {
        flex: 1;
    }
}
</style>