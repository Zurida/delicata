<script setup>
definePageMeta({
    layout: 'recipe'
})

function sendForm(params) {
    console.log(params)
}

let category = ref('xkf')

const options = [{ value: 'breakfast', text: 'Завтраки' }, { value: 'dinner', text: 'Ужин' }]
</script>

<template>
    <div class="container">
        <CommonTitle title="Добавить рецепт" class="create__title" />


        <form class="form" @submit.prevent="sendForm">
            <div class="form__select">
                <h3>Категория</h3>
                категория {{ category }}
                <CommonVSelect :options="options" :name="category" v-model="category">
                </CommonVSelect>
            </div>

            <div class="form__title">
                <h3>Заголовок</h3>
                <input type="text" id="title">
            </div>

            <div class="form__ingridients">
                <div class="form__ingridient">
                    <h3>Способ приготовления</h3>
                    <input type="text" placeholder="Инргидиент"> -
                    <select name="measure">
                        <option value="">Единица измерения</option>
                        <option>мл</option>
                    </select>
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