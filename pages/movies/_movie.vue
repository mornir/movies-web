<template>
  <article>
    <h1>{{ movie.title }}</h1>
    <BlockContent :blocks="movie.overview" :serializers="serializers" />

    <h2>nuxt/image</h2>
    <nuxt-img
      provider="sanity"
      :src="movie.poster.asset._ref"
      :alt="movie.title + ' poster'"
      width="500"
      height="500"
      sizes="sm:100vw lg:520px"
    />

    <h2>@sanity/image-url</h2>
    <img
      :src="$urlFor(movie.poster).width(500).height(500)"
      :alt="movie.title + ' poster'"
      width="500"
      height="500"
    />
    <BlockContent :blocks="movie.overview" :serializers="serializers" />
  </article>
</template>

<script>
import externalLink from '@/components/serializers/externalLink'
import BlockContent from 'sanity-blocks-vue-component'

const query = /* groq */ `{ "movie": *[_type == 'movie' && slug.current == $slug] | order(_updatedAt desc)[0]}`

export default {
  name: 'Movie',
  components: { BlockContent },
  asyncData({ $sanity, params, payload }) {
    if (payload) {
      return { movie: payload }
    }
    return $sanity.fetch(query, {
      slug: params.movie,
    })
  },
  data() {
    return {
      serializers: {
        marks: {
          link: externalLink,
        },
      },
    }
  },
  /* Possible implementation of real-time preview. Requires @sanity/client.
  mounted() {
    if (this.$route.query.preview)
      this.$sanity
        .listen('*[_type == "movie" && slug.current == $slug][0] | order(_updatedAt desc)[0]', {
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
