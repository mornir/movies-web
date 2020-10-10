import imageUrlBuilder from '@sanity/image-url'

export default ({ $sanity }, inject) => {
  const builder = imageUrlBuilder($sanity.client)

  function urlFor(source) {
    return builder.image(source)
  }

  inject('urlFor', urlFor)
}
