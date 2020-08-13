export default ({ query, enablePreview, store }) => {
  if (query.previewId) {
    const id = query.previewId
    enablePreview({ id })
    store.commit('showBanner')
  }
}
