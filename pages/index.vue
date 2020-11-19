<template>
  <div>
    <ul>
      <li v-for="movie in movies" :key="movie._id">
        <nuxt-link :to="'/' + movie.link + '/'">{{ movie.title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
const query = /* groq */ `{
  "movies": *[_type == 'movie'] {
    _id,
    title,
    "link": slug.current
  }
}
`

export default {
  name: 'MoviesList',
  asyncData({ $sanity }) {
    return $sanity.fetch(query)
  },
}
</script>
