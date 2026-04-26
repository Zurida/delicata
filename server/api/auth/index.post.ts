type TRes = {
    access_token: string,
    token_type: string,
    expires_in: number
}

export default defineEventHandler(async (event) => {
    try {
        const { email, password } = await readBody(event);

        const res = await $fetch<TRes>(`${useRuntimeConfig().myProxyUrl}auth/login/`, {
            method: 'POST',
            body: { email, password }
        })


        setCookie(event, 'auth_token', res.access_token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/',
        });


        const user = {
            email,
            createdAt: new Date(),
        }

        await setUserSession(event, {
            user,
            loggedInAt: new Date(),
            token: res.access_token
        });

        return { success: true, user };

    } catch (error) {
        console.error(error)
    }
})