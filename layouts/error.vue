<template>
  <div class="p-8 mx-auto prose lg:prose-xl">
    <div v-if="error.statusCode === 404">
      <img :src="`https://http.cat/404.jpg`" />
      <p>404 not found</p>
      <p>
        Go back to
        <nuxt-link to="/" class="underline text-primary">Home Page</nuxt-link>
      </p>
    </div>

    <div v-else>
      <h1>An error occurred</h1>
      <p>Error Code: {{ error.statusCode }}</p>
      <p>Error Message: {{ error.message }}</p>

      <img :src="`https://http.cat/${error.statusCode}.jpg`" />
      <nuxt-link to="/" class="underline text-primary">Back home</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      default: () => {},
    },
  },
  head() {
    const { message, statusCode: code } = this.error
    return {
      title: `${code} – ${message}`,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: message,
        },
      ],
    }
  },
}
</script>
