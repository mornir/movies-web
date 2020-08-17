export default ({ query, enablePreview, store }) => {
  if (query.preview) {
    enablePreview()
    store.commit('showBanner')
  }
}
