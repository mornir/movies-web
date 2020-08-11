export default async ({ query, enablePreview, $preview }) => {
  console.log('Preview Enabled')
  if (typeof query.preview !== 'undefined') {
    const { pageId, isDraft } = query

    console.log(pageId)
    if (isDraft) {
      const movie = await $preview.fetch('*[_id == $id][0]', {
        id: pageId,
      })

      enablePreview(movie)
    } else {
      enablePreview()
    }
  }
}
