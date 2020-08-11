export default ({ query, enablePreview }) => {
  console.log('Preview Enabled')
  if (typeof query.preview !== 'undefined') {
    enablePreview(query)
  }
}

/*
export default async ({ query, enablePreview, $sanityPreview }) => {
  console.log('Preview Enabled')
  if (typeof query.preview !== 'undefined') {
    const { pageId, isDraft } = query

    console.log(pageId)
    if (isDraft) {
      const movie = await $sanityPreview.fetch('*[_id == $id][0]', {
        id: pageId,
      })

      enablePreview(movie)
    } else {
      enablePreview()
    }
  }
}
 */
