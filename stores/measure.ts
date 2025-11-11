import type { TMeasure } from "~/types/measure"

export const useMeasureStore = defineStore('measure', {
  state: () => {
    return {
      measures: [] as TMeasure[] | [],
    }
  },
  actions: {
    async fetchMeasures() {
      try {
        const newMeasures = await $fetch<TMeasure[]>('/api/measures')
        this.measures = newMeasures ?? []
      } catch (error) {
        console.error('Error fetching:', error);
      }
    },

    async addMeasures(title: string) {
      try {
        await $fetch<TMeasure>(`/api/measures/`, {
          method: 'POST',
          body: { title }
        }).then(() => {
          this.fetchMeasures()
        })
      } catch (error) {
        console.error('Error fetching:', error);
      }
    },

    async deleteMeasures(id: string | number) {
      try {
        await $fetch<TMeasure>(`/api/measures/${id}`, {
          method: 'DELETE'
        }).then(() => {
          this.fetchMeasures()
        })

      } catch (error) {
        console.error('Error fetching:', error);
      }
    }
  },
})

