import { sanity } from './plugins/sanity'

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-hea
   */
  head: {
    title: process.env.npm_package_name || '',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~plugins/sanity.js',
    '~plugins/preview.client.js',
    '~/plugins/to-link.js',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://tailwindcss.nuxtjs.org
    '@nuxtjs/tailwindcss',
    '@nuxtjs/sitemap',
    '@nuxt/image',
  ],

  generate: {
    fallback: true,
    crawler: false,
    async routes() {
      const movies = (await sanity.fetch(`*[_type == "movie"]`)) || []
      return movies.map((movie) => {
        return {
          route: `/movies/${movie.slug.current}/`,
          payload: movie,
        }
      })
    },
  },

  router: {
    trailingSlash: true,
  },

  tailwindcss: {
    jit: true,
  },

  sitemap: {
    hostname: 'https://nuxt-sanity-movies.netlify.app',
  },

  image: {
    sanity: {
      projectId: 'tufjlt9c',
    },
  },
}
