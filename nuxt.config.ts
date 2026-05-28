export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    myProxyUrl: process.env.NUXT_MY_PROD_PROXY_URL,
    public: {
      myProxyUrl: process.env.NUXT_MY_PROD_PROXY_URL
    },
  },
  typescript: {
    typeCheck: true
  },
  css: ['~/assets/css/main.scss'],

  modules: ['@pinia/nuxt', '@nuxt/fonts', 'nuxt-auth-utils', '@stefanobartoletti/nuxt-social-share'],

  nitro: {
    storage: {
      users: {
        driver: 'memory',
        base: '.cache',
      }
    },

  },

  fonts: {
    defaults: {
      weights: [400, 500, 600, 700],
      styles: ['normal']
    },
    provider: 'google',
    families: [
      {
        name: 'Advent Pro',
        weights: [400, 500, 600, 700],
        styles: ['normal']
      }
    ]
  },

  socialShare: {
    baseUrl: process.env.NUXT_MY_PROD_PROXY_URL
  },

  routeRules: {
    '/api/**': {
      cors: true,
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
        scss: {
          additionalData: `@use "~/assets/css/_mixins.scss" as *;`,
        },
      },
    },
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
})