export default defineEventHandler(async (event) => {
    const url = getRequestURL(event);
    const session = await getUserSession(event)

    if (url.pathname !== "/auth" && !session.user) {
        return sendRedirect(event, "/auth");
    }

    // if (url.pathname === "/auth" && session.user) {
    //     return sendRedirect(event, "/");
    // }
});
