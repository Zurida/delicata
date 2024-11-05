// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  typescript: {
    typeCheck: true
  },
  // imports: {
  //   dirs: ['types/*.ts', 'store/*.ts', 'types/**/*.ts'],
  // },
  css: ['~/assets/css/main.css'],

  modules: [
    ['@nuxtjs/google-fonts', {
      families: {
        Montserrat: true,
        Nunito: true,
      }
    }],
    'nuxt-icons',
    '@pinia/nuxt'
  ],

  nitro: {
    prerender: {
      concurrency: 250,
      interval: 100,
    },
    storage: {
      users: {
        driver: 'memory',
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
  compatibilityDate: '2024-07-17',
  vite: {
    css: {
      preprocessorOptions: {
        sass: {
          api: 'modern'
        }
      },
    },
  }
})