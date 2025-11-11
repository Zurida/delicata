<script setup lang="ts">
import type { TCategory, TExistingCategory } from '~/types/category';

const categoriesStore = useCategoryStore()
const { categories } = storeToRefs(categoriesStore)

const category = ref<string>('')

function handleCategorySubmit() {
    categoriesStore.addCategories(category.value)
    category.value = ''
}

async function handleRemoveCategory(category: TCategory | TExistingCategory) {
    if ('id' in category) {
        await categoriesStore.deleteCategories(category.id)
    }

}
</script>

<template>
    <ProfileForm v-model="category" :items="categories" title="Категории" @submit="handleCategorySubmit"
        @delete="handleRemoveCategory" />

</template>