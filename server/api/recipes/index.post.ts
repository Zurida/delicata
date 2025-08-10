import type { TRecipe } from "~/types/recipe";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    // const body = await readBody(event);
    const body = await readMultipartFormData(event)
    console.log('body', body)
    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: "No file provided",
        });
    }
    const file = body.find((f) => f.name === 'images')

    if (!file) return


    console.log('file', file)
    try {
        const res = await event.$fetch(`${useRuntimeConfig().myProxyUrl}recipes/`, {
            method: 'POST',
            body,
            headers: {
                Authorization: `Bearer ${token}`,
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