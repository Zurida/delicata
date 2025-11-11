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
        const { data: measures } = await useFetch<TMeasure[]>('/api/measures')
        this.measures = measures.value ?? []
      } catch (error) {
        console.error('Error fetching:', error);
      }

    }
  },
})

