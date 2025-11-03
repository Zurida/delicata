<script setup lang="ts">
import type { TCategory, TExistingCategory } from '~/types/category';

const categoriesStore = useCategoryStore()
const { categories } = storeToRefs(categoriesStore)

const category = ref<string>('')

async function handleCategorySubmit() {
    try {
        await $fetch(`/api/categories`, {
            method: 'POST',
            body: {
                title: category.value
            },
        }).then(() => {
            category.value = ''
            categoriesStore.fetchCategories()
        })

    } catch (error) {
        console.log(error)
    }
}

async function handleRemoveCategory(category: TCategory | TExistingCategory) {
    if ('id' in category) {
        await $fetch(`/api/categories/${category.id}`, {
            method: 'DELETE'
        })
    }

}
</script>

<template>
    <ProfileForm v-model="category" :items="categories" title="Категории" @submit="handleCategorySubmit"
        @delete="handleRemoveCategory" />
</template>

<style lang="scss" scoped>
.form {
    margin-top: var(--gap);
    margin-bottom: var(--gap);
    padding: var(--gap);
    background-color: var(--white);
    border-radius: var(--border-radius);

    .VInput {
        width: 100%;
        margin-right: var(--gap-sm);
    }

    h4 {
        margin-bottom: var(--gap);
    }

    &__list {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
        font-size: calc(var(--fs-lg) * 1.2);
        margin-bottom: var(--gap);
    }

    &__item {
        position: relative;
        display: flex;
        align-items: center;
        width: max-content;
        // gap: var(--gap-sm);
        margin-right: var(--gap-sm);
    }

    &__delete {
        @include center;

        width: 2.4rem;
        height: 100%;
        margin-left: var(--gap-sm);
        transition: color 0.2s, background-color 0.2s;
        border-radius: var(--border-radius);

        &:hover {
            background-color: var(--main-1);
            color: var(--white);
        }
    }

    &__submit {
        margin-top: var(--gap);
    }
}
</style>