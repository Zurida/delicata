import type { TExistingCategory } from "~/types/category"

// export const useCategoryStore = defineStore<
//   'category',
//   { categoryList: TExistingCategory[]; category: TExistingCategory | null; }
// >('category', {
//   state: () => {
//     return {
//       categoryList: [],
//       category: null,
//     }
//   },

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categories: [] as TExistingCategory[],
    }
  },
  actions: {
    async fetchCategories() {
      try {
        const categories = await useFetch<TExistingCategory[]>('/api/categories')
        this.categories = categories.data ? categories.data.value as TExistingCategory[] : []
      } catch (error) {
        console.error('Error fetching:', error);
      }

    }
  },
})

