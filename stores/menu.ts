import type { TExistingCategory } from "~/types/category"

export const useCategoryStore = defineStore<string, { categories: TExistingCategory[] }>('categoryStore', {
  state: () => ({
    categories: []
  }),
  actions: {
    async fetch() {
      try {
        const categories = await $fetch('/api/category')

        this.categories = categories
      }
      catch (e) {
        console.log(e)
      }
    }
  }
})
