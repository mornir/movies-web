<template>
  <article>
    <h1>{{ movie.title }}</h1>
    <img :src="$urlFor(movie.poster)" :alt="movie.title + ' poster'" />
    <BlockContent :blocks="movie.overview" />
  </article>
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'
export default {
  name: 'Movie',
  components: {
    BlockContent,
  },
  validate({ params, store, query }) {
    // If FALSE redirect to 404 page
    return (
      query.preview === 'true' || store.state.moviesSlugs.includes(params.slug)
    )
  },
  async asyncData({ $sanity, params }) {
    try {
      const movie = await $sanity.fetch(
        "*[_type == 'movie' && slug.current == $slug][0]",
        {
          slug: params.slug,
        }
      )
      return {
        movie,
      }
    } catch (error) {
      console.error(error)
    }
  },
  data() {
    return {
      movie: {},
    }
  },
  /* Possible implementation of real-time preview. Requires @sanity/client.
  mounted() {
    if (this.$route.query.preview)
      this.$sanity
        .listen('*[_type == "movie" && slug.current == $slug][0]', {
          slug: this.$route.params.slug,
        })
        .subscribe(async (update) => {
          // Doesn't work for references
          // this.movie = update.result
          // this.$nuxt.refresh()

          try {
            this.movie = await this.$sanity.fetch(
              "*[_type == 'movie' && slug.current == $slug][0]",
              {
                slug: this.$route.params.slug,
              }
            )
          } catch (error) {
            console.error(error)
          }
        })
  }, */
}
</script>
