// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    myProxyUrl: process.env.NUXT_MY_PROD_PROXY_URL,
    public: {
      myProxyUrl: process.env.NUXT_MY_PROD_PROXY_URL
    }
  },
  typescript: {
    typeCheck: true
  },
  // imports: {
  //   dirs: ['types/*.ts', 'store/*.ts', 'types/**/*.ts'],
  // },
  css: ['~/assets/css/main.scss'],

  modules: [['@nuxtjs/google-fonts', {
    families: {
      Montserrat: true,
      Nunito: true,
    }
  }], 'nuxt-icons', '@pinia/nuxt', '@nuxt/fonts', 'nuxt-auth-utils', '@stefanobartoletti/nuxt-social-share'],

  nitro: {
    storage: {
      users: {
        driver: 'memory',
        base: '.cache',
      }
    },

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