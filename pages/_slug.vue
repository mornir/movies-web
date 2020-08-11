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
    console.log({ preview: $preview })
    if ($preview) {
      const movie = await $sanityPreview.fetch('*[_id == $id][0]', {
        id: $preview.pageId,
      })
      return {
        movie,
      }
    }
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
}
</script>
