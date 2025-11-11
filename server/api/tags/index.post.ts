
export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');
    const body = await readBody(event);

    try {

        const res = await event.$fetch(`${useRuntimeConfig().myProxyUrl}tags/`, {
            method: 'POST',
            body,
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return res

    } catch (error) {
        console.log('my error', error)
    }
})