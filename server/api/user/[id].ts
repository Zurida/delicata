export default defineCachedEventHandler(async event => {
 const id = getRouterParam(event, 'id');
 await new Promise(resolve => setTimeout(resolve, 1000));
 return {
    id,
    sessionId: event.context.user.id
 }
}, {swr: true});