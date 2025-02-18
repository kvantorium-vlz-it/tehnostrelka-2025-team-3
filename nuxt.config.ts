// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ["@prisma/nuxt", 'nuxt-auth-utils'],
  runtimeConfig: {
    oauth: {
      'yandex': {
        clientId: 'e0d561a721294cadb10a1fe467cb9613',
        clientSecret: '0759017980084569ba337b2a3bb31ee5'
      }
    }
  }
})
