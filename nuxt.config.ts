// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  app: {
    pageTransition: {
      name: 'fade',
      mode: 'out-in'
    },
  },
  css: ['~/assets/css/main.css'],
  modules: [
    ['@nuxtjs/google-fonts', {
      families: {
        Montserrat: true,
        Nunito: true,
      }
    }],
  ]

})
