//@ts-ignore

export default async (event) => {
    const session = await getUserSession(event);
    if (!session.user) {
        return sendRedirect(event, "/auth");
    }
};
