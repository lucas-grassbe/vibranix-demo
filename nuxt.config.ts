// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: [
    '@nuxt/icon',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@sidebase/nuxt-auth',

  ],
  runtimeConfig: {
    baseURL: '/api/auth'
  },
  auth: {
    originEnvKey: 'NUXT_BASE_URL',
    provider: {
      type: 'local',
      pages: {
        login: '/login',
      },
      endpoints: {
        signIn: { path: '/api/auth/login', method: 'post' },
        signOut: { path: '/api/auth/logout', method: 'post' },
        signUp: { path: '/api/auth/register', method: 'post' },
        getSession: { path: '/api/auth/session', method: 'get' },
      },
      token: {
        signInResponseTokenPointer: '/token',
        type: 'Bearer',
        cookieName: 'demo-auth.token',
        headerName: 'Authorization',
        maxAgeInSeconds: 1800, // 30 minutes
        sameSiteAttribute: 'lax',
        secureCookieAttribute: true,
        httpOnlyCookieAttribute: false,
      },
      refresh: {
        isEnabled: true,
        endpoint: { path: '/api/auth/refresh', method: 'post' },
        refreshOnlyToken: true,
        token: {
          signInResponseRefreshTokenPointer: '/refreshToken',
          refreshResponseTokenPointer: '/token',
          refreshRequestTokenPointer: '/refreshToken',
          cookieName: 'demo-auth.refreshToken',
          maxAgeInSeconds: 2592000, // 30 days
          sameSiteAttribute: 'lax',
          secureCookieAttribute: true,
          httpOnlyCookieAttribute: false,
        }
      }
    },
    session: {
      enableRefreshPeriodically: 60000, // 1 minute
    },
  },
  imports: {
    dirs: ['stores'],
  },
  nitro: {
    preset: 'vercel',
    externals: {
      inline: ['vue', '@vue/runtime-core', '@vue/reactivity', '@vue/shared'],
    },
  },
})