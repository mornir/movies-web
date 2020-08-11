export default ({ query, enablePreview }) => {
  if (typeof query.preview !== 'undefined') {
    console.log('Preview Enabled')
    enablePreview()
  }
}
