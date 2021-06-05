import PicoSanity from 'picosanity'
import imageUrlBuilder from '@sanity/image-url'
// Config data for Sanity Client
const sanity = PicoSanity({
  projectId: 'tufjlt9c',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2021-05-28',
  withCredentials: true,
})

const builder = imageUrlBuilder(sanity)
const urlFor = (source) => builder.image(source).auto('format')

export { sanity }

export default (_, inject) => {
  inject('urlFor', urlFor)
  inject('sanity', sanity)
}
