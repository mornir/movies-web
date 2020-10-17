<template>
  <nav>
    <nuxt-link
      v-for="route in routes"
      :key="route._id"
      class="mr-4 text-xl"
      :to="$toLink(route)"
      >{{ route.title }}</nuxt-link
    >
  </nav>
</template>

<script>
const query = `
*[_type == 'menu'][0]{
    navigation[]->
  }
`
export default {
  name: 'Navbar',
  async fetch() {
    try {
      const { navigation } = await this.$sanity.fetch(query)
      this.routes = navigation
    } catch (error) {
      console.error(error)
    }
  },
  data() {
    return {
      routes: [],
    }
  },
}
</script>
