// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  css: ['~/assets/css/main.css'],
  modules: [
    ['@nuxtjs/google-fonts', {
      families: {
        Montserrat: true,
      }
    }],
  ]

})
