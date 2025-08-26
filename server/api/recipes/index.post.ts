import type { TRecipe } from "~/types/recipe";

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    // const body = await readBody(event);
    const body = await readMultipartFormData(event)

    if (!body) {
        throw createError({
            statusCode: 400,
            statusMessage: "No file provided",
        });
    }

    console.log('body', body)

    try {

        const res = await event.$fetch(`${useRuntimeConfig().myProxyUrl}recipes/`, {
            method: 'POST',
            body
        })
        // console.log('res', res)

        return res

    } catch (error) {
        console.log('my error', error)
        // return createError({
        //     statusCode: 500,
        //     statusMessage: "Failed to process request",
        // });
    }
})