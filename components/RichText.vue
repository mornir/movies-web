<template>
  <BlockContent :blocks="blocks" :serializers="serializers" />
</template>

<script>
import BlockContent from 'sanity-blocks-vue-component'
import externalLink from '@/components/serializers/externalLink'
import internalLink from '@/components/serializers/internalLink'

export default {
  components: {
    BlockContent,
  },
  props: {
    blocks: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      serializers: {
        marks: {
          externalLink,
          internalLink,
          recipeLink: internalLink,
        },
      },
    }
  },
}
</script>

<style lang="postcss" scoped>
h2 {
  @apply text-big leading-tight mb-6 mt-12;
}

h3 {
  @apply text-medium mb-6;
}

p {
  @apply text-copy mb-6;
}

ul {
  @apply mb-4;
}
li {
  @apply text-xl;
}
</style>
