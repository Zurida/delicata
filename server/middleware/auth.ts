import protectRoute from "../protectRoute";

export default defineEventHandler(async (event) => {
    // const url = getRequestURL(event);
    // const session = await getUserSession(event)

    // if (url.pathname === "/auth" && !session.user) {
    //     return;
    // }

    // if (url.pathname === "/auth" && session.user) {
    //     return sendRedirect(event, "/");
    // }

    // if (url.pathname !== "/auth" && isMethod(event, "GET")) {
    //     await protectRoute(event)
    // }

    console.log(event.node.req.url)
});
