export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  modules: ['@pinia/nuxt', 'pinia-plugin-persistedstate/nuxt'],
  imports: {
    dirs: ['stores'],
  },
})
