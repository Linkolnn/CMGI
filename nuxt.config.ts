// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  
  // Конфигурация для доступа к переменным окружения
  runtimeConfig: {
    // Приватные ключи доступны только на сервере
    // Публичные ключи доступны и на клиенте
    public: {
      apiKey: process.env.NUXT_PUBLIC_API_KEY,
      adminUsername: process.env.NUXT_PUBLIC_ADMIN_USERNAME,
      adminPassword: process.env.NUXT_PUBLIC_ADMIN_PASSWORD,
      appName: process.env.NUXT_PUBLIC_APP_NAME,
      appUrl: process.env.NUXT_PUBLIC_APP_URL
    }
  },
  css: [
    '~/assets/styles/main.scss',
    '@fortawesome/fontawesome-free/css/all.css'
  ],
  modules: [
    '@pinia/nuxt',
  ],
  // Глобальный middleware для проверки авторизации
  router: {
    middleware: ['auth']
  },
  nitro: {
    compressPublicAssets: true,
    minify: true
  },
  experimental: {
    payloadExtraction: true,
    renderJsonPayloads: true
  },
  routeRules: {
    '/**': { prerender: true }
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: 'Центр молодёжных и гражданских инициатив',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Центр молодёжных и гражданских инициатив города Урай' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ]
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variables.scss"; @import "@/assets/styles/mixins.scss";'
        }
      }
    }
  }
})
