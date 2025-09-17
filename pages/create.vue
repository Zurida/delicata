<script setup lang="ts">
import type { TImage, TRecipe } from '~/types/recipe';
import type { TIngredient } from '~/types/ingredient';
import type { TMeasure } from '~/types/measure';
import { getTypedKeys } from '~/assets/ts/utils';

import type { ZodIssue } from "zod"
import type { TRecipeFormErrors } from "~/types/schemas";
import { RecipeFormSchema } from "~/types/schemas";


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
    tags: [],
    images: []
});


const isDisabled = ref(true)
const isDragging = ref(false)
const isLoading = ref(false)

const recipeFormErrors = ref<TRecipeFormErrors>({});

let errors: ZodIssue[]

// Validation.
const validateFormData = (value: unknown): boolean => {
    const result = RecipeFormSchema.safeParse(value);

    if (!result.success) {
        errors = [...result.error.errors];
    }

    return result.success;
};

const displayErrors = () => {
    recipeFormErrors.value = errors.reduce((acc: Record<string, string>, error) => {
        acc[error.path[0]] = error.message;
        return acc
    }, {})

    setTimeout(() => {
        recipeFormErrors.value = {
            category_id: '',
            title: '',
        }
    }, 4000)
    return false;
}

const ingredient = ref<TIngredient>({
    title: "",
    quantity: 0,
    measure_id: null
})

const formData = new FormData()

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

function handleChange() {
    if (ingredient.value.title && ingredient.value.quantity && ingredient.value.measure_id) {
        isDisabled.value = false
    } else {
        isDisabled.value = true
    }
}

function handleFileChange(e: Event) {
    const eventTarget = e.target as HTMLInputElement;
    const files: File[] = Array.from(eventTarget?.files || [])
    recipe.images = files;
}

function removeFile(index: number) {
    if (!recipe.images) return
    recipe.images.splice(index, 1);
}

function handleDragover(e: Event) {
    e.preventDefault();
    isDragging.value = true;
}

function handleDragleave() {
    isDragging.value = false;
}

function handleDrop(e: DragEvent) {
    e.preventDefault();
    recipe.images = [...Array.from(e.dataTransfer?.files || [])];
    isDragging.value = false;
}

function generateURL(file: File) {
    const uploadedFile: File = file
    let fileSrc = URL.createObjectURL(uploadedFile);
    setTimeout(() => {
        URL.revokeObjectURL(fileSrc);
    }, 1000);
    return fileSrc;
}

async function handleSubmit(evt: Event) {
    evt.preventDefault()
    isLoading.value = true

    if (!validateFormData(recipe)) {
        isLoading.value = false
        return displayErrors();
    };

    // Reset errors if data are valid.
    recipeFormErrors.value = {};

    const typedKeys = getTypedKeys(recipe);

    typedKeys.forEach((key) => {
        if (key) {
            if (key === 'ingredients') {
                recipe[key]?.forEach((ingredientObj, index) => {
                    const ingredientTypedKeys = getTypedKeys(ingredientObj);
                    ingredientTypedKeys.forEach((ingrKey) => {
                        formData.append(`ingredients[${index}][${ingrKey}]`, `${ingredientObj[ingrKey]}`);
                    })
                })
            }

            if (key === 'images') {
                recipe[key]?.forEach((file: TImage) => {
                    if (!(file instanceof File)) return
                    const uploadedFile: File = file
                    formData.append('images[]', uploadedFile)
                })
            }

            if (key === 'tags') {
                recipe[key]?.forEach((tag) => {
                    formData.append(`${key}[]`, `${tag}`);
                })
            }

            if (typeof recipe[key] === 'string' || typeof recipe[key] === 'number') {
                formData.append(key, recipe[key] as string);
            }
        }

    })

    const url = useRuntimeConfig().public.myProxyUrl

    try {
        await $fetch(`${url}recipes/`, {
            method: 'POST',
            body: formData,
        }).then(() => {
            navigateTo('/')
        })

    } catch (error) {
        console.log(error)
    }
    finally {
        isLoading.value = false
    }
}

const computedImages = computed(() => {
    return recipe.images?.filter(item => item instanceof File)
})

</script>

<template>
    <div class="create container">
        <CommonVOverlay :is-visible="isLoading">
            <CommonVLoader />
        </CommonVOverlay>
        <form class="form" @submit.prevent="handleSubmit" enctype="multipart/form-data">
            <div class="form__item">
                <h3>Категория*</h3>
                <CommonVSelect :options="categoryStore.categories" v-model="recipe.category_id" select-name="categories"
                    :error="recipeFormErrors.category_id" />
            </div>

            <div class="form__item">
                <h3>Заголовок*</h3>
                <CommonVInput v-model="recipe.title" type="text" placeholder="Введите текст"
                    :error="recipeFormErrors.title">
                </CommonVInput>
            </div>

            <div class="form__item tags">
                <h3>Тэги</h3>
                <div class="tags__fields">
                    <CommonVTag class="recipe__tag" v-for="tag in tags" :label="tag.title" v-model="recipe.tags"
                        :val="tag.title" />
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

            <div class="form__item upload" :class="{ 'is-dragging': isDragging }" @dragover="handleDragover"
                @dragleave="handleDragleave" @drop="handleDrop">
                <label for="file-input" class="upload__label">
                    <IconsIconUpload class="upload__icon"></IconsIconUpload>
                    Добавить одну или несколько картинок
                </label>
                <input id="file-input" hidden type="file" @change="handleFileChange" multiple
                    accept=".jpg,.jpeg,.png" />



                <TransitionGroup name="list" tag="ul" class="upload__list">
                    <li v-for="(file, index) in computedImages" :key="file.name" class="upload__item">
                        <IconsIconClose class="upload__remove" @click="removeFile(index)"></IconsIconClose>

                        <div class="upload__preview">

                            <img :src="generateURL(file)" />
                        </div>
                        <div>

                            <p> {{ file.name }}</p>
                            <!-- <p>{{ Math.round(file.size / 1000) }} КБ</p> -->
                        </div>

                    </li>
                </TransitionGroup>
            </div>

            <CommonVButton type="submit" :disabled="isLoading">Сохранить</CommonVButton>

        </form>
    </div>
</template>

<style lang="scss" scoped>
.create {
    padding-top: var(--gap);
    padding-bottom: var(--gap);
    position: relative;
}

.form {
    padding: 0 var(--gap);
    overflow: hidden;

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

    @include respond-to(sm) {
        flex-direction: column;
        align-items: baseline;
    }

    &__form {
        flex: 1;
        margin-right: var(--gap);

        @include respond-to(sm) {
            width: 100%;
        }

        .VInput {
            width: 14rem;

            // @include respond-to(sm) {
            //     width: 30%;
            // }

            &:first-child {
                @include respond-to(sm) {
                    width: 100%;
                }
            }

            &:nth-child(2) {
                @include respond-to(sm) {
                    width: 50%;
                }
            }
        }
    }

    &__fields {
        display: flex;
        gap: .5rem;

        @include respond-to(sm) {
            flex-wrap: wrap;
        }
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

        @include respond-to(sm) {
            width: 100%;
            margin-top: var(--gap);
        }
    }

    &__item {
        display: flex;
        align-items: center;
        width: 100%;

        &:not(:last-child) {
            margin-bottom: 1rem;
        }

        @include respond-to(sm) {
            flex-direction: row-reverse;
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

.upload {
    &__label {
        cursor: pointer;
        display: flex;
        align-items: center;
        border: 1px dashed var(--main-3);
        padding: var(--gap);
        border-radius: var(--border-radius);
        background-color: var(--white);
        font-size: var(--fs-small);
        cursor: pointer;
        transition: .4s opacity cubic-bezier(0.075, 0.82, 0.165, 1), opacity .4s;

        &:hover {
            opacity: .6;
        }
    }

    &.is-dragging {
        .upload__label {
            opacity: 0.6;
            border-color: var(--main-1);
        }
    }

    &__icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 2rem;
        height: 2rem;
        border-radius: calc(var(--border-radius) / 2);
        margin-right: calc(var(--gap-sm));
        line-height: 1;
        font-size: calc(var(--fs-base) * 2);
        color: var(--main-1);

        svg {
            fill: currentColor;
        }
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: var(--gap-sm);
        margin-top: var(--gap-sm);
    }

    &__item {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-right: 1.6rem;

        p {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 4.8rem;
        }
    }

    &__remove {
        position: absolute;
        top: 0;
        right: 0;
        cursor: pointer;
        color: var(--main-1);
        width: 1.2rem;
        height: 1.2rem;
        transition: scale .4s, color .4s;

        &:hover {
            scale: 1.2;
            color: var(--error);
        }
    }

    &__preview {
        width: 5rem;
        height: 5rem;
        border-radius: var(--border-radius);
        padding: 3px;
        border: 1px solid var(--main-1);
        background-color: var(--white);
        overflow: hidden;


        img {
            object-fit: cover;
            border-radius: inherit;
        }
    }
}
</style>