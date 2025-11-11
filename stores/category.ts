import type { TExistingCategory } from "~/types/category"

export const useCategoryStore = defineStore('category', {
  state: () => {
    return {
      categories: [] as TExistingCategory[] | null,
    }
  },
  actions: {
    async fetchCategories() {
      try {
        const categories = await $fetch<TExistingCategory[]>('/api/categories')
        this.categories = categories ?? []
      } catch (error) {
        console.error('Error fetching:', error);
      }
    },

    async addCategories(title: string) {
      try {
        const newCategory = await $fetch<TExistingCategory>(`/api/categories/`, {
          method: 'POST',
          body: { title }
        }).then(() => {
          this.fetchCategories()
        })

        // this.categories?.push(newCategory)
      } catch (error) {
        console.error('Error fetching:', error);
      }
    },

    async deleteCategories(id: string | number) {
      try {
        const category = await $fetch<TExistingCategory>(`/api/categories/${id}`, {
          method: 'DELETE'
        }).then(() => {
          this.fetchCategories()
        })

      } catch (error) {
        console.error('Error fetching:', error);
      }
    }
  },
})

