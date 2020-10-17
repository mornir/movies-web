export default (context, inject) => {
  const toLink = (route) =>
    route.slug.current === '/' ? route.slug.current : `/${route.slug.current}/`
  inject('toLink', toLink)
}
