<script setup lang="ts">
import type { TRecipe } from '~/types/recipe';
import type { TIngredient } from '~/types/ingredient';
import type { TMeasure } from '~/types/measure';

definePageMeta({
    middleware: ['auth'],
});

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

const ingredient = ref<TIngredient>({
    title: "",
    quantity: 0,
    measure_id: null
})


function addIngredient() {
    recipe.ingredients?.push({
        ...ingredient.value
    })
    clearingredientFields()
}

function clearingredientFields() {
    ingredient.value.title = ""
    ingredient.value.quantity = 0
    ingredient.value.measure_id = null
    isDisabled.value = true
}

function removeIngredient(index: number) {
    recipe.ingredients?.splice(index, 1)
}

function removeTag(index: number) {
    recipe.tags?.splice(index, 1)
}

function handleChange() {
    if (ingredient.value.title && ingredient.value.quantity && ingredient.value.measure_id) {
        isDisabled.value = false
    } else {
        isDisabled.value = true
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
        }).then(() => {
            navigateTo('/')
        })

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

            <div class="form__item tags">
                <h3>Тэги</h3>
                <div class="tags__fields">
                    <CommonVTag class="recipe__tag" v-for="tag in tags" :label="tag.title" v-model="recipe.tags"
                        :value="tag.title" />
                </div>
            </div>

            <h3>Ингредиенты</h3>
            <div class="form__item ingredients">
                <div class="ingredients__form">

                    <div class="ingredients__fields" @change="handleChange">
                        <CommonVInput v-model="ingredient.title" type="text" placeholder="Введите ингредиент" />
                        <CommonVInput v-model="ingredient.quantity" type="number" placeholder="Введите количество" />
                        <CommonVSelect :options="measures" v-model="ingredient.measure_id" select-name="measures"
                            class="ingredients__select" />
                    </div>

                    <CommonVButton small @click="addIngredient" :disabled="isDisabled" class="ingredients__btn">Добавить
                        Инргидиент</CommonVButton>
                </div>

                <TransitionGroup name="list" tag="ul" class="ingredients__list" v-show="recipe.ingredients?.length">
                    <li class="ingredients__item" v-for="(ingridient, index) in recipe.ingredients"
                        :key="`ingredient-${index}`">

                        <p class="ingredients__text">
                            {{ ingridient.title }} - {{ ingridient.quantity }}
                            {{measures.find((measure: TMeasure) => measure.id === ingridient.measure_id)?.title}}</p>

                        <span class="ingredients__remove" @click="removeIngredient(index)">
                            <IconsIconClose></IconsIconClose>
                        </span>
                    </li>
                </TransitionGroup>

            </div>


            <div class="form__item">
                <h3>Источник</h3>
                <CommonVInput v-model="recipe.source" type="text" placeholder="Укажите автора или ссылку на автора">
                </CommonVInput>
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
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    &__form {
        flex: 1;
        margin-right: var(--gap);

        .VInput {
            width: 14rem;
        }
    }

    &__fields {
        display: flex;
        gap: .5rem;
    }

    &__select {
        flex: 1;
    }

    &__btn {
        margin-top: calc(var(--gap) / 2);
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        width: 40%;
        padding-left: var(--gap);
        border-left: 1px solid #f9573866;
        font-size: 1.4rem;
        color: var(--main-2);
    }

    &__item {
        display: flex;
        align-items: center;
        width: 100%;

        &:not(:last-child) {
            margin-bottom: 1rem;
        }
    }

    &__text {
        flex: 1;
        text-transform: lowercase;

        &::first-letter {
            text-transform: uppercase;
        }
    }

    &__remove {
        width: 2rem;
        height: 2rem;
        margin-right: .4rem;
        transition: scale .4s;
        color: var(--main-1);

        &:hover {
            cursor: pointer;
            scale: 1.2;
        }
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