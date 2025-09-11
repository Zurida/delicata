export default defineNuxtRouteMiddleware(async (to, from) => {
    const { loggedIn } = useUserSession();

    if (!loggedIn.value && to.path !== '/auth') {
        return navigateTo("/auth");
    }
});