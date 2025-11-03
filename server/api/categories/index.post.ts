
export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    const body = await readBody(event);
    console.log(body)
    try {

        const res = await event.$fetch(`${useRuntimeConfig().myProxyUrl}categories/`, {
            method: 'POST',
            body
        })

        return res

    } catch (error) {
        console.log('my error', error)
    }
})