import type { TRecipe } from "~/types/recipe";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    const body = await readBody(event);

    try {
        const res = await event.$fetch(`${useRuntimeConfig().myProxyUrl}recipes/`, {
            method: 'PUT',
            body,
            headers: {
                Authorization: `Bearer ${token}`
            }

        })

        return res

    } catch (error) {
        console.log('my error', error)
        // return createError({
        //     statusCode: 500,
        //     statusMessage: "Failed to process request",
        // });
    }
})