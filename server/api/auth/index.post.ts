import bcrypt from "bcrypt";

export default defineEventHandler(async (event) => {

    try {
        const body = await readBody(event)
        const res = await $fetch(`${useRuntimeConfig().myProxyUrl}auth/login/`, {
            method: 'post',
            body: body
        })

        if (!res) {
            return createError({
                statusCode: 401,
                statusMessage: "Invalid username or password",
            });
        }

        const userData = { username: body.email };
        await setUserSession(event, {
            user: userData,
            loggedInAt: new Date(),
        });

        return { success: true, userData };

    } catch (error) {
        return createError({
            statusCode: 500,
            statusMessage: "Failed to process request",
        });
    }
})