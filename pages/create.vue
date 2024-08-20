<script setup lang="ts">
definePageMeta({
    layout: 'recipe'
})

function sendForm() {
    // console.log(params)
}

let category = ref('')
let measure = ref('')

const options = [{ id: 0, value: 'breakfast', text: 'Завтраки', name: 'categories' }, { id: 1, value: 'dinner', text: 'Ужин', name: 'categories' }]

const measures = [{ id: 0, value: 'мл', text: 'мл', name: 'measure' }, { id: 1, value: 'г', text: 'г', name: 'measure' }]


const userInfo = reactive({
    name: "Fotis",
    bio:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita deleniti laboriosam eligendi. Incidunt dolores dicta veritatis. Quaerat ad, magnam esse, illo atque delectus minus, nihil adipisci tempora nobis iusto. Excepturi?",
    location: "Barcelona",
    website: "fadamakis.com",
});


</script>

<template>
    <div class="container">
        <CommonTitle title="Добавить рецепт" class="create__title" />


        <form class="form" @submit.prevent="sendForm">
            <div class="form__select">
                <h3>Категория</h3>
                <CommonVSelect :options="options" v-model="category" />

            </div>

            <div class="form__title">
                <h3>Заголовок</h3>
                <CommonVInput v-model="userInfo.name">
                    <template #label> Name </template>
                </CommonVInput>
            </div>

            <div class="form__ingridients">
                <div class="form__ingridient">
                    <h3>Способ приготовления</h3>
                    <input type="text" placeholder="Инргидиент"> -
                    <CommonVSelect :options="measures" v-model="measure" />
                </div>

                <CommonVButton small>Добавить Инргидиент</CommonVButton>
            </div>

            <div class="form__steps">
                <h3>Способ приготовления</h3>
                <textarea placeholder="Введите текст" id="steps"></textarea>
            </div>

            <div class="form__gallery">
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
        margin-bottom: 2rem;
    }
}

h3 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 600;
}
</style>