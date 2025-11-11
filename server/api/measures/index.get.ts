export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');

    try {
        const res = await $fetch(`${useRuntimeConfig().myProxyUrl}measures/`, {

            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return res
    } catch (error) {
        console.log(error)
    }
})