<template functional>
  <nuxt-link
    v-if="props.slug && children[0] && children[0].text"
    :to="props.slug === '/' ? '/' : `/${props.slug}/`"
    class="underline"
  >
    <slot />
  </nuxt-link>
</template>
