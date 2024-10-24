// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  routeRules: {
    '/api/**': {proxy: 'https://abfahrtsmonitor.vrr.de/backend/api/stations/**'},
  },

  css: [
      '~/assets/css/tailwind.css',
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ['dayjs-nuxt'],
})