import { createClient, groq } from '@nuxtjs/sanity'

const configSanity = {
  projectId: 'tufjlt9c',
  withCredentials: true,
  useCdn: false,
  minimal: true,
}
export const client = createClient(configSanity)
const getAllMovies = groq`*[_type == 'movie']`

export default {
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: process.env.npm_package_name || '',
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
  plugins: ['~plugins/preview.client.js', '~plugins/image-builder'],
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
    // Doc: https://sanity.nuxtjs.org
    '@nuxtjs/sanity',
  ],

  generate: {
    fallback: true,
    routes() {
      return client.fetch(getAllMovies).then((movie) => {
        return {
          route: `/${movie.slug.current}/`,
          payload: movie,
        }
      })
    },
  },

  // Doc: https://sanity.nuxtjs.org/configuration
  sanity: {
    ...configSanity,
  },
}
