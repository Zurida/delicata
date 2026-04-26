export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedIn, fetch } = useUserSession()
    // Optional: Refresh session to ensure it's up to date
    await fetch()
    if (!loggedIn.value && to.path !== '/auth') {
        return navigateTo('/auth')
    }
})
