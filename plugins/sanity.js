import sanity from 'picosanity' // or from '@sanity/client'

import imageUrlBuilder from '@sanity/image-url'
// Config data for Sanity Client

const baseConfig = {
  projectId: 'tufjlt9c',
  dataset: 'production',
  useCdn: false,
}

const client = sanity(baseConfig)

const preview = sanity({
  withCredentials: true,
  ...baseConfig,
})

const fetchDocById = (id) =>
  preview.fetch('*[_id == $id][0]', {
    id,
  })

const builder = imageUrlBuilder(client)

const urlFor = (source) => builder.image(source).auto('format')

// So we can import the client in nuxt.config.js
// export { client }

export default (context, inject) => {
  // Inject sanity client to the instance and context as $sanity
  context.$sanity = client
  inject('sanity', client)

  // DO NOT CALL IT PREVIEW
  context.$sanityPreview = fetchDocById
  inject('sanityPreview', fetchDocById)

  context.$urlFor = urlFor
  inject('urlFor', urlFor)
}
