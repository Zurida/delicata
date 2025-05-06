export default defineNuxtRouteMiddleware(async (to, from) => {
    console.log('main', to.path)
    const { loggedIn } = useUserSession();

    if (!loggedIn.value && to.path !== '/auth') {
        return navigateTo("/auth");
    }
});