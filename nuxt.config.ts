// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint'],
  eslint: {
    config: {
      stylistic: false,
    },
  },
  /*  Isso é usado por causa do build da vercel, porém a vercel faz isso automaticamente
  nitro: {
    preset: 'vercel',
  },*/
  vite: {
    ssr: {
      noExternal: ['vue'],
    },
  },
})
