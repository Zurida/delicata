<script setup lang="ts">
import type { TRecipe } from '~/types/recipe';

const { data: measures } = await useFetch('/api/measures')
const { data: tags } = await useFetch('/api/tags')

const categoryStore = useCategoryStore()

const recipe = reactive<TRecipe>({
    title: "",
    category_id: 0,
    source: "",
    ingredients: [],
    description: "",
    tags: []
});

const isDisabled = ref(true)

const ingredient = ref({
    name: "",
    quantity: 0,
    measure: null
})

function addingredient() {
    recipe.ingredients?.push({
        ...ingredient.value
    })
    clearingredientFields()
}

function clearingredientFields() {
    ingredient.value.name = ""
    ingredient.value.quantity = 0
    ingredient.value.measure = null
}

function removeIngredient(index: number) {
    recipe.ingredients?.splice(index, 1)
}

function removeTag(index: number) {
    recipe.tags?.splice(index, 1)
}

function handleChange() {
    console.log('hi')
    if (!ingredient.value.name || !ingredient.value.quantity || !ingredient.value.measure) {
        isDisabled.value = true
    } else {
        isDisabled.value = false
    }
}

async function handleSubmit(evt: Event) {

    evt.preventDefault()

    const body: TRecipe = {
        ...recipe
    }
    try {
        return await $fetch('/api/recipes', {
            method: 'POST',
            body
        })
        // navigateTo('/')
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <div class="create container">
        <form class="form" @submit.prevent="handleSubmit">
            <div class="form__item">
                <h3>Категория*</h3>
                <CommonVSelect :options="categoryStore.categories" v-model="recipe.category_id"
                    select-name="categories" />
            </div>

            <div class="form__item">
                <h3>Заголовок*</h3>
                <CommonVInput v-model="recipe.title" type="text" placeholder="Введите текст">
                </CommonVInput>
            </div>

            <div class="form__item">
                <h3>Источник</h3>
                <CommonVInput v-model="recipe.source" type="text" placeholder="Укажите автора или ссылку на автора">
                </CommonVInput>
            </div>

            <div class="form__item ingredients">
                <h3>Ингредиенты</h3>

                <div class="ingredients__list" v-if="recipe.ingredients?.length">

                    <div class="ingredients__item" v-for="(item, index) in recipe.ingredients"
                        :key="`ingredient-${index}`">
                        <p class="ingredients__text">{{ item.name }} - {{ item.quantity }} {{ item.measure }}</p>
                        <span class="ingredients__remove"><nuxt-icon name="close"
                                @click="removeIngredient(index)"></nuxt-icon></span>
                    </div>
                </div>
                <div class="ingredients__fields" @change="handleChange">
                    <CommonVInput v-model:model="ingredient.name" type="text" placeholder="Введите ингредиент" />
                    <CommonVInput v-model:model="ingredient.quantity" type="number" placeholder="Введите количество" />
                    <CommonVSelect :options="measures" v-model="ingredient.measure" select-name="measures"
                        class="ingredients__select" />
                </div>
            </div>

            <CommonVButton small @click="addingredient" :disabled="isDisabled" class="ingredients__btn">Добавить
                Инргидиент</CommonVButton>

            <div class="form__item tags">
                <h3>Тэги</h3>
                <div class="tags__fields">
                    <CommonVTag class="recipe__tag" v-for="tag in tags" :label="tag.title" v-model="recipe.tags"
                        :value="tag.title" />
                </div>
            </div>


            <div class="form__item">
                <h3>Способ приготовления</h3>
                <CommonVTextarea placeholder="Введите текст" id="steps" v-model="recipe.description"></CommonVTextarea>
            </div>

            <!-- <div class="form__item">
                <span>+</span>
                <p>Добавить фото</p>
            </div> -->


            <CommonVButton type="submit">Сохранить</CommonVButton>

        </form>
    </div>
</template>

<style lang="scss">
.create {
    padding-top: var(--gap);
    padding-bottom: var(--gap);
}

.form {
    padding: 0 var(--gap);

    &__item {
        margin-bottom: 1.6rem;
    }
}

h3 {
    margin-bottom: 1rem;
    font-size: 1.8rem;
    font-weight: 600;
}

.ingredients {
    width: 100%;

    &__list {
        font-size: 1.4rem;
        color: var(--main-2);
    }

    &__item {
        display: flex;
        align-items: center;
        margin-bottom: 1rem;
    }

    &__text {
        width: 100%;
        padding: .6rem;
        background-color: bisque;
        border-radius: 5px;
    }

    &__remove {
        margin-left: 1rem;
        margin-right: 1rem;
        transition: scale .4s;

        svg {
            width: 3rem;
        }

        &:hover {
            cursor: pointer;
            scale: 1.2;
        }
    }

    &__fields {
        display: flex;
        gap: .5rem;
        width: 100%;
    }

    &__select {
        flex: 1;
    }

    &__btn {
        margin-bottom: 1.6rem;
    }
}

.tags {
    &__fields {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }
}
</style>