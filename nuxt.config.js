export default {
  head: {
    title: 'Biges Contact',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ],
  },
  // loading: '~/components/LoadingBar.vue',
  pageTransition: {
    name: 'page',
    mode: 'out-in'
  },
  css: [
    '~/assets/styles/bootstrap-grid.min.css',
    '~/assets/styles/normalize.css',
    '~/assets/styles/global.css',
  ],
  plugins: [],
  components: true,
  buildModules: [],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/toast',
    'nuxt-i18n',
    'cookie-universal-nuxt',
    'nuxt-vue-select'
  ],
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/auth/local', method: 'post', propertyName: 'jwt' },
          logout: false,
          user: { url: '/users/me', method: 'get', propertyName: false }
        },
        //tokenType: 'Bearer ',
      },
      redirect: {
        login: '/login',
        logout: '/',
        callback: '/login',
        home: '/'
      }
    },
  },
  toast: {
    position: 'bottom-center'
  },
  i18n: {
    locales: [
      { name: 'Turkish', code: 'tr', iso: 'tr-TR', file: 'tr-TR.js' },
      { name: 'English', code: 'en', iso: 'en-US', file: 'en-US.js' },
    ],
    langDir: 'lang/',
    lazy: true,
    // defaultLocale: 'en',
    strategy: 'prefix_except_default',

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
    },
  },
  // axios: { baseURL: 'http://localhost:1337' },
  axios: { baseURL: 'https://bigesapi.gedik.dev' },
  build: {},
}