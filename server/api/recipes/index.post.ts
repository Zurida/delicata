import type { TRecipe } from "~/types/recipe";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    // const body = await readBody(event);
    const body = await readMultipartFormData(event)
    try {

        const res = await event.$fetch(`${useRuntimeConfig().myProxyUrl}recipes/`, {
            method: 'POST',
            body
        })

        return res

    } catch (error) {
        console.log('my error', error)
    }
})