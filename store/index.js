export const state = () => ({
  showDrafPreviewBanner: false,
})

export const mutations = {
  showBanner(state) {
    state.showDrafPreviewBanner = true
  },
}
