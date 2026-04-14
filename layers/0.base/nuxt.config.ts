export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  css: ['#layers/0.base/app/assets/css/main.css'],
  modules: ['@nuxt/icon', '@nuxt/ui', '@vueuse/nuxt', '@nuxt/image'],
  image: {
    cloudflare: {
      baseURL: 'https://files.lucasgrass.com',
    },
  },
})
