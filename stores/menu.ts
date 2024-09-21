import type { TCategory } from "~/types/category"

export const useMenuStore = defineStore<string, { categories: TCategory[] }>('menuStore', {
  state: () => ({
    categories: []
  }),
  actions: {
    async fetch() {
      const categories = await $fetch('/api/menu')

      this.categories = categories
      console.log(this.categories)
    }
  }
})
