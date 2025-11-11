import type { TTag } from "~/types/tag"

export const useTagsStore = defineStore('tag', {
    state: () => {
        return {
            tags: [] as TTag[] | [],
        }
    },
    actions: {
        async fetchTags() {
            try {
                const newTags = await $fetch<TTag[]>('/api/tags')
                this.tags = newTags ?? []
            } catch (error) {
                console.error('Error fetching:', error);
            }
        },

        async addTags(title: string) {
            try {
                await $fetch<TTag>(`/api/tags/`, {
                    method: 'POST',
                    body: { title }
                }).then(() => {
                    this.fetchTags()
                })
            } catch (error) {
                console.error('Error fetching:', error);
            }
        },

        async deleteTags(id: string | number) {
            try {
                await $fetch<TTag>(`/api/tags/${id}`, {
                    method: 'DELETE'
                }).then(() => {
                    this.fetchTags()
                })

            } catch (error) {
                console.error('Error fetching:', error);
            }
        }
    },
})

