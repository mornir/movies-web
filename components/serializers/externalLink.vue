<template functional>
  <a
    v-if="props.href && children[0] && children[0].text"
    :href="props.href"
    target="_blank"
    rel="noopener"
    class="underline"
  >
    <slot />
  </a>
</template>
