<template>
  <article>
    <h1>{{ movie.title }}</h1>
    <img :src="$urlFor(movie.poster)" :alt="movie.title + 'poster'" />
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

  async asyncData({ $sanity, params, $preview, $sanityPreview }) {
    try {
      if ($preview?.id) {
        const movie = await $sanityPreview($preview.id)
        return {
          movie,
        }
      }

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
      isDraft: false,
    }
  },
  /*  mounted() {
   if (this.$preview)
      this.$sanityPreview
        .listen('*[_id == $id][0]', { id: this.$route.query.pageId })
        .subscribe((update) => {
          this.movie = update.result
        })
  }, */
}
</script>
