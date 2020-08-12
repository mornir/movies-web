/* export default async ({ query, enablePreview, $sanityPreview }) => {
  console.log('Preview Enabled')
  if (typeof query.preview !== 'undefined') {
    const { pageId, isDraft } = query

    if (isDraft) {
      const movie = await $sanityPreview.fetch('*[_id == $id][0]', {
        id: pageId,
      })

      enablePreview({ data: movie, isDraft: true })
    } else {
      enablePreview()
    }
  }
}
 */

export default ({ query, enablePreview, store }) => {
  console.log('Preview Enabled')
  if (typeof query.preview !== 'undefined') {
    if (query.isDraft) {
      store.commit('showBanner')
      enablePreview({ isDraft: true, pageId: query.pageId })
    } else {
      enablePreview()
    }
  }
}
