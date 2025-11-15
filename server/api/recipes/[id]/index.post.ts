
export default defineEventHandler(async (event) => {
    const recipeId = event.context.params?.id;

    const token = getCookie(event, 'auth_token')
    const parts = await readMultipartFormData(event)
    const fd = new globalThis.FormData() // или import FormData из undici

    if (parts) {
        for (const p of parts) {
            if (!p.filename && p.name) {
                fd.append(p.name, p.data.toString('utf8'))
            } else {
                if (p.name) {
                    // Blob из Uint8Array/ArrayBuffer безопаснее
                    const ab = p.data.buffer.slice(p.data.byteOffset, p.data.byteOffset + p.data.byteLength)
                    //@ts-ignore
                    const blob = new globalThis.Blob([ab], { type: p.type })
                    fd.append(p.name, blob, p.filename)
                }
            }
        }
    }

    const res = await $fetch(`${useRuntimeConfig().myProxyUrl}recipes/${recipeId}`, {
        method: 'POST',
        body: fd,
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return res
})