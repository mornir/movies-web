export const state = () => ({
  showDrafPreviewBanner: false,
  moviesSlugs: [],
})

export const mutations = {
  showBanner(state) {
    state.showDrafPreviewBanner = true
  },
  setMoviesSlugs(state, slugs) {
    state.moviesSlugs = slugs
  },
}

export const actions = {
  async nuxtServerInit({ commit }, { $sanity }) {
    const moviesSlugs = await $sanity
      .fetch('*[_type == "movie"].slug.current')
      .catch((e) => console.error(e))

    commit('setMoviesSlugs', moviesSlugs)
  },
}
