export default defineEventHandler(async (event) => {
    const query = getQuery(event)

    console.log('query', query)
    try {
        const res = await $fetch(`${useRuntimeConfig().myProxyUrl}recipes/`, {
            method: 'GET',
            query
        })
        return res
    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Failed to process request",
        });
    }
})