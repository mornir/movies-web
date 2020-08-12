<template>
  <div>
    <client-only>
      <aside
        v-if="$store.state.showDrafPreviewBanner"
        class="sticky top-0 py-2 text-center bg-blue-500 bg-opacity-50"
      >
        <p class="font-semibold">
          Draft Preview.
          <button class="font-semibold underline" @click="$nuxt.refresh()">
            Click here to refresh
          </button>
        </p>
      </aside>
    </client-only>
    <div class="p-8 mx-auto prose lg:prose-xl">
      <header>
        <h1><nuxt-link to="/">Home</nuxt-link></h1>
      </header>
      <main>
        <Nuxt />
      </main>
    </div>
  </div>
</template>
