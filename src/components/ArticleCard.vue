<template>
  <div
    class="card bg-neutral-50 dark:bg-neutral-900 dark:text-gray-50 text-black grid md:flex md:grid-cols-2 border-gray-400 rounded-md border dark:border-gray-800 md:hover:shadow-lg"
  >
    <router-link :to="`/articles/${name}`">
      <div class="md:min-w-[12rem] max-h-[14rem] overflow-hidden cursor-pointer">
        <img
          class="md:max-w-[12rem] md:max-h-[12rem] w-full rounded-l-md"
          :src="`/articles/${name}/img/www/image.jpg`"
        />
      </div>
    </router-link>
    <div class="m-2 flex flex-col justify-between">
      <router-link :to="`/articles/${name}`">
        <h2 class="my-0 font-semibold mb-2">{{ title }}</h2>
      </router-link>
      <h5 class="cutAfterFourRows my-0 font-thin">{{ short }}</h5>
      <div class="mt-1 md:mt-0">
        <span
          class="md:inline pr-2 hover:text-black hover:dark:text-gray-50 cursor-pointer navigation-button"
          :class="{
            'text-gray-400': !currentTags.includes(tag),
            'text-black': currentTags.includes(tag),
            'dark:text-white': currentTags.includes(tag),
            'font-bold': currentTags.includes(tag)
          }"
          v-for="tag of tags"
          :key="tag"
          @click="tagClicked(tag)"
        >
          #{{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

defineProps({
  name: String,
  title: String,
  short: String,
  tags: Array,
  currentTags: Array
})

const router = useRouter()
const route = useRoute()

const tagClicked = (tag) => {
  if (route.query.tags) {
    if (!route.query.tags.split(',').includes(tag)) {
      router.push(`/?tags=${route.query.tags + ',' + tag}`)
    }
  } else {
    router.push(`/?tags=${tag}`)
  }
}
</script>

<style scoped></style>
