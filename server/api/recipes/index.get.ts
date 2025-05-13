export default defineEventHandler(async (event) => {
    try {
        const res = await $fetch(`${useRuntimeConfig().myProxyUrl}recipes/`, {
            method: 'GET'
        })
        return res
    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Failed to process request",
        });
    }
})