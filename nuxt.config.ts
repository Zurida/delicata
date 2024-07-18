// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },

  css: ['~/assets/css/main.css'],

  modules: [
    ['@nuxtjs/google-fonts', {
      families: {
        Montserrat: true,
        Nunito: true,
      }
    }],
    'nuxt-icons',
  ],

  nitro: {
    storage: {
      users: {
        driver:'memory',
        base: '.cache',
      }
    }
  },

  routeRules: {
    '/api/**': {
      cors: true,
    },
    '/api/user/bob': {
      // prerender: true,
      isr: true,
    },
    '/page': {
      headers: {
        'x-hackathon': 'true'
      }
    } 
  },

  compatibilityDate: '2024-07-17'
})