
export default defineEventHandler(async (event) => {
    const session = await getUserSession(event)
    // Проверяем, авторизован ли пользователь
    if (!session.user) {
        throw createError({
            statusCode: 401,
            message: 'Unauthorized'
        })
    }

    return session.user;
})
