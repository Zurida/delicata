export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    const query = getQuery(event)
    try {
        const res = await $fetch(`${useRuntimeConfig().myProxyUrl}recipes/`, {
            method: 'GET',
            query,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
})