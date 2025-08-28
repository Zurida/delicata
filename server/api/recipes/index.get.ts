export default defineEventHandler(async (event) => {
    const query = getQuery(event)
    try {
        const res = await $fetch(`${useRuntimeConfig().myProxyUrl}recipes/`, {
            method: 'GET',
            query
        })
        return res
    } catch (error) {
        console.log(error)
    }
})