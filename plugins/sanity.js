import sanity from 'picosanity' // or from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

const client = sanity({
  projectId: 'tufjlt9c',
  dataset: 'production',
  useCdn: false,
  withCredentials: true,
})

const builder = imageUrlBuilder(client)

const urlFor = (source) => builder.image(source).auto('format')

// So we can import the client in nuxt.config.js
// export { client }

export default (context, inject) => {
  // Inject sanity client to the instance and context as $sanity
  context.$sanity = client
  inject('sanity', client)

  context.$urlFor = urlFor
  inject('urlFor', urlFor)
}
