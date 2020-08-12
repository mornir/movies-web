export default ({ query, enablePreview, store }) => {
  if (query.previewId) {
    const id = query.previewId
    const isDraft = id.includes('drafts')

    if (isDraft) {
      enablePreview({ id })
      store.commit('showBanner')
    } else {
      enablePreview()
    }
  }
}
