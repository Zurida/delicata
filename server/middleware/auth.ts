export default defineEventHandler(async event => {
    const token = getCookie(event, 'token');
    const sessionConfig = {password: '2QWwB3zvfbQZt22Tndl01gCbek2Lfbb6'}
    const session = await getSession(event, sessionConfig);
    console.log(session)

    event.context.user = session.data;

    if (!session.data.id) {
        await updateSession(event, sessionConfig, {
            id: getHeader(event,'x-user-id'),
        });
    }
    const storage = useStorage('users');



    if (await storage.hasItem('token')) {
        await storage.setItem('token', 'new updated token');
    } else {
        await storage.setItem('token', 'new token');
    }
    if (event.path.startsWith('/api/user') && token === 'hi') {
        // throw createError({
        //     statusCode: 401,
        // })
    }
  })
  