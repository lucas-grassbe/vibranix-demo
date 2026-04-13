// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/eslint', '@nuxtjs/i18n'],
  i18n: {
    defaultLocale: 'pt',
    strategy: 'prefix_except_default',
    langDir: 'locales',
    locales: [
      { code: 'pt', language: 'pt-BR', file: 'pt.json', name: 'Português' },
      { code: 'en', language: 'en-US', file: 'en.json', name: 'English' },
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      fallbackLocale: 'pt',
    },
  },
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
