export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'auth_token');

    try {
        const { email } = await readBody(event)
        const res = await $fetch(`${useRuntimeConfig().myProxyUrl}auth/me/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })

        // if (!refreshToken) {
        //     setCookie(event, 'auth_token', res?.access_token, {
        //         httpOnly: true,
        //         secure: true,
        //         sameSite: 'strict',
        //         path: '/',
        //         maxAge: 15 * 60,
        //     });
        // }

        // const userData = { user: email };
        // await setUserSession(event, {
        //     user: userData,
        //     loggedInAt: new Date(),
        // });

        // return { success: true, userData };

    } catch (error) {
        console.error(error)
    }
})