import type { TRecipe } from "~/types/recipe";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');

    try {
        const res = await event.$fetch(`${useRuntimeConfig().myProxyUrl}recipes/`, {
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