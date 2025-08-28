import bcrypt from "bcrypt";
export default defineEventHandler(async (event) => {
    // Clear the current user session just in case
    await clearUserSession(event);

    const body = await readBody(event);

    // const hashedPassword = await hashPassword(password); // Hash password
    // const hashedPasswordConfirmation = await hashPassword(password_confirmation); // Hash password

    const userData = { name: body.name, email: body.email, password: body.password, password_confirmation: body.password_confirmation };

    try {
        const res = await $fetch(`${useRuntimeConfig().myProxyUrl}auth/register`, {
            method: 'POST',
            body: userData
        })
    } catch (error) {
        console.error("Error creating user:", error);
    }
});