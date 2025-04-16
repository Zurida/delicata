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
      categoryList: [] as TExistingCategory[],
    }
  },
  actions: {
    async fetchCategories() {
      try {
        await $fetch('/api/categories').then((res: TExistingCategory[]) => {
          this.categoryList = res;
        })
      } catch (error) {
        console.error('Error fetching:', error);
      }

    }
  },
})

