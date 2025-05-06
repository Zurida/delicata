import bcrypt from "bcrypt";
type TRes = {
    access_token: string,
    token_type: string,
    expires_in: number
}

export default defineEventHandler(async (event) => {
    // Clear the current user session just in case
    await clearUserSession(event);

    const { username, password, email } = await readBody(event);

    const hashedPassword = await hashPassword(password); // Hash password

    const userData = { name: username, email: email, password: hashedPassword };

    try {

        const res = await $fetch(`${useRuntimeConfig().myProxyUrl}auth/register`, {
            method: 'POST',
            body: userData
        })

        // if (!res) {
        //     return createError({
        //         statusCode: 401,
        //         statusMessage: "Error occured",
        //     });
        // }

        // const loginRes = await $fetch<TRes>(`${useRuntimeConfig().myProxyUrl}auth/login/`, {
        //     method: 'POST',
        //     body: { email: email, password: hashedPassword }
        // })

        // if (!loginRes) {
        //     return createError({
        //         statusCode: 401,
        //         statusMessage: "Error occured",
        //     });
        // }

        // setCookie(event, 'auth_token', loginRes.access_token, {
        //     httpOnly: true,
        //     secure: true,
        //     sameSite: 'strict',
        //     path: '/',
        //     maxAge: 60 * 60,
        // });

        // return await setUserSession(event, {
        //     user: email,
        //     loggedInAt: new Date(),
        // });
    } catch (error) {
        console.error("Error creating user:", error);
        return createError({
            statusCode: 409,
            statusMessage: "Username already exists",
        });
    }

});