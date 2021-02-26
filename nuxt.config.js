import { createClient } from '@nuxtjs/sanity'
import fetch from 'node-fetch'
if (!globalThis.fetch) {
  globalThis.fetch = fetch
}

const configSanity = {
  projectId: 'tufjlt9c',
  useCdn: false,
  minimal: true,
  dataset: 'production',
}

const client = createClient(configSanity)

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
    '~plugins/preview.client.js',
    '~plugins/image-builder.js',
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
    '@nuxtjs/sanity',
    '@nuxtjs/sitemap',
  ],

  generate: {
    fallback: true,
    crawler: false,
    async routes() {
      const movies = await client.fetch(`*[_type == "movie"]`)
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

  sitemap: {
    hostname: 'https://nuxt-sanity-movies.netlify.app',
  },

  sanity: {
    ...configSanity,
    withCredentials: true,
  },
}
