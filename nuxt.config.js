import axios from "axios"
export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'taichanブログ',
    htmlAttrs: {
      lang: 'ja'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'taichanのブログサイトです。web技術やガジェット、雑記などを書いていきます。' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    base: {
      href: 'router.base'
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~plugins/vue-scrollto'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
    // https://blog.microcms.io/nuxt-microcms-module/
    'nuxt-microcms-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/sitemap'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  generate: {
    fallback: true,
    async routes() {
      const domain = process.env.MICROCMS_SERVICE_DOMAIN;
      const limit = 10
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i)

      // 一覧のページング
      const pages = await axios
        .get(`https://${domain}.microcms.io/api/v1/article?limit=0`, {
          headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY },
        })
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / limit)).map((p) => ({
            route: `/page/${p}`,
          }))
        )

      const tags = await axios
        .get(`https://${domain}.microcms.io/api/v1/tags?fields=id`, {
          headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY },
        })
        .then(({ data }) => {
          return data.contents.map((content) => content.id)
        })

      const tagTops = tags.map(tag => { return {route: `/tag/${tag}`}})

      // タグページのページング
      const tagPages = await Promise.all(
        tags.map((tag) =>
          axios.get(
            `https://${domain}.microcms.io/api/v1/article?limit=0&filters=tags[contains]${tag}`,
            { headers: { 'X-API-KEY': process.env.MICROCMS_API_KEY } }
          )
          .then((res) =>
            range(1, Math.ceil(res.data.totalCount / limit)).map((p) => ({
              route: `/tag/${tag}/page/${p}`,
            })))
        )
      )
      const flattenTagPages = [].concat.apply([], tagPages)
      return [...pages, ...tagTops, ...flattenTagPages]
    },
  },

  router: {
    base: `/blog/`,
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'page',
      })
      routes.push({
        path: '/tag/:tagId',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'tag',
      })
      routes.push({
        path: '/tag/:tagId/page/:p',
        component: resolve(__dirname, 'pages/index.vue'),
        name: 'tag-page',
      })
    },
  },

  sitemap: {
    hostname: 'https://taichan.site',
    gzip: true,
    exclude: [],
  },

  microcms: {
    options: {
      serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN,
      apiKey: process.env.MICROCMS_API_KEY,
    },
    mode: process.env.NODE_ENV === 'production' ? 'server' : 'all',
  },
}
