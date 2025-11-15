export default defineEventHandler(async (event) => {
    const recipeId = event.context.params?.id;
    const token = getCookie(event, 'auth_token');

    try {
        const res = await event.$fetch(`${useRuntimeConfig().myProxyUrl}recipes/${recipeId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res

    } catch (error) {
        console.log('my error', error)
    }
})