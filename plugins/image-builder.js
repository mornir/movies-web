import imageUrlBuilder from '@sanity/image-url'

export default ({ $sanity }, inject) => {
  const builder = imageUrlBuilder($sanity.config)
  function urlFor(source) {
    return builder.image(source).format('auto')
  }
  inject('urlFor', urlFor)
}
