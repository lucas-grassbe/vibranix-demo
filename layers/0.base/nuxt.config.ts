export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['#layers/0.base/app/assets/css/main.css'],
  modules: [
    '@nuxt/icon',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui',
    '@vueuse/nuxt',
  ],
})
