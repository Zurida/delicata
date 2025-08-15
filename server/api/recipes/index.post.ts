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
    for (const field of body) {
        if (field.data instanceof Buffer) {
            // 'field.data' will be a Buffer containing the file's binary content
            // 'field.filename' will contain the original filename
            // 'field.type' will contain the MIME type (e.g., 'image/png')
            console.log('File Buffer:', field.data);
            console.log('Filename:', field.filename);
            console.log('MIME Type:', field.type);
        }
    }
    const file = body.find((f) => f.name === 'images')

    if (!file) return


    try {

        const res = await event.$fetch(`${useRuntimeConfig().myProxyUrl}recipes/`, {
            method: 'POST',
            body,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
        console.log('res', res)

        return res

    } catch (error) {
        console.log('my error', error)
        // return createError({
        //     statusCode: 500,
        //     statusMessage: "Failed to process request",
        // });
    }
})