<template>
  <div class="prose lg:prose-xl p-8">
    <ul>
      <li v-for="movie in movies" :key="movie._id">
        <nuxt-link :to="'/' + movie.link">{{ movie.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
const query = `
*[_type == 'movie'] {
  _id,
  title,
  "link": slug.current
}
`

export default {
  name: 'MoviesList',

  async asyncData({ $sanity }) {
    try {
      const movies = await $sanity.fetch(query)
      return {
        movies,
      }
    } catch (error) {
      console.error(error)
    }
  },
  data() {
    return {
      movies: [],
    }
  },
}
</script>
