import type { TExistingCategory } from "~/types/category"

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categories: [] as TExistingCategory[],
    }
  },
  actions: {
    async fetchCategories() {
      try {
        const categories = await $fetch<TExistingCategory[]>('/api/categories')
        this.categories = categories as TExistingCategory[] ?? []
      } catch (error) {
        console.error('Error fetching:', error);
      }

    }
  },
})

