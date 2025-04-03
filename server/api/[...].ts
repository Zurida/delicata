// created from video of Alexander Lichter on the best way to proxy api https://www.youtube.com/watch?v=J4E5uYz5AY8&t=873s

// [...].ts catches all routes 
import { joinURL } from 'ufo' // goes under the hood

export default defineEventHandler(async (event) => {
    const proxyURL = useRuntimeConfig().myProxyUrl;
    const path = event.path.replace(/^\/api\//, '');

    const target = joinURL(proxyURL, path)

    return proxyRequest(event, target) // goes under the hood
})
