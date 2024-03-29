<template>
  <div class="flex justify-between w-full">
    <div class="flex justify-center flex-grow">
      <div class="article">
        <div class="mb-5">
          <router-link to="/"
                       class="flex link items-end text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white">
            <SvgIcon
                type="mdi"
                :path="mdiArrowLeft"
                :size="24"
            />
            <h5 class="my-0 ml-2">Back to articles list</h5>
          </router-link>
        </div>
        <h1 class="mt-3 mb-2.5">{{ title }}</h1>
        <div class="my-2 border-b dark:border-neutral-800 lg:hidden"/>
        <div class="text-justify hyphens-auto my-2 block lg:hidden">
          <router-link
              class="pr-2 font-bold navigation-button text-gray-400 hover:text-black hover:dark:text-gray-50"
              v-for="tag of tags"
              :key="tag"
              :to="tagLink(tag)"
          >
            #{{ tag }}
          </router-link>
        </div>
        <p class="text-justify hyphens-auto mb-2 block lg:hidden">
          <div class="text-gray-600 dark:text-gray-400">Published</div>
          <b>{{ published }}</b>
          <div class="text-gray-600 dark:text-gray-400">Last update</div>
          <b>{{ lastUpdate }}</b>
        </p>
        <p class="lg:hidden">
          <div class="mt-3 border-b dark:border-neutral-800"/>
          <h5>Authors</h5>
          <div v-for="author of authors" :key="author.author">
            <a target="_blank" class="link text-gray-600 dark:text-gray-400 hover:text-black hover:dark:text-gray-50"
               :href="author.link">{{ author.author }}</a>
          </div>
        </p>
        <div class="my-2 border-b dark:border-neutral-800 lg:hidden"/>
        <div v-html="articleContent"/>
        <p class="lg:hidden" v-if="reviewers.length > 0">
          <div class="mt-3 border-b dark:border-neutral-800"/>
          <h5>Article Reviewers</h5>
          <div v-for="reviewer of sortedReviewers" :key="reviewer.reviewer">
            <a target="_blank" class="link text-gray-600 dark:text-gray-400 hover:text-black hover:dark:text-gray-50"
               :href="reviewer.link">{{ reviewer.reviewer }}</a>
          </div>
        </p>
        <div v-if="bibliography.length > 0">
          <div class="mt-3 border-b dark:border-neutral-800"/>
          <h3>Bibliography</h3>
          <template v-for="bib of bibliography" :key="bib.title">
            <a class="link text-gray-600 dark:text-gray-400 hover:text-black hover:dark:text-gray-50" target="_blank"
               :href="bib.link">{{
                bib.title
              }}</a>
            <span>;&nbsp;{{ bib.author }}</span>
          </template>
        </div>
      </div>
    </div>
    <div class="w-[10rem] self-stretch border-l dark:border-neutral-900 ml-3 text-right hidden lg:block">
      <div class="mx-3 sticky top-24">
        <h4 class="mt-0 mb-2">Tags</h4>
        <div>
          <router-link
              class="inline-block pl-2 pt-1 text-gray-600 dark:text-gray-400 hover:text-black hover:dark:text-gray-50"
              v-for="tag of tags"
              :key="tag"
              :to="tagLink(tag)"
          >#{{ tag }}
          </router-link>
        </div>
        <div class="mt-3 border-b dark:border-neutral-800" v-if="reviewers.length > 0"/>
        <p class="text-right hyphens-auto mb-2 mt-3">
          <h4 class="mt-0 mb-2">Authors</h4>
          <div v-for="author of authors" :key="author.author">
            <a target="_blank" class="link text-gray-600 dark:text-gray-400 hover:text-black hover:dark:text-gray-50"
               :href="author.link">{{ author.author }}</a>
          </div>
        </p>
        <div class="mt-3 border-b dark:border-neutral-800"/>
        <p class="text-right hyphens-auto mb-2 mt-3" v-if="reviewers.length > 0">
          <h4 class="mt-0 mb-2">Article Reviewers</h4>
          <div v-for="reviewer of sortedReviewers" :key="reviewer.reviewer">
            <a target="_blank" class="link text-gray-600 dark:text-gray-400 hover:text-black hover:dark:text-gray-50"
               :href="reviewer.link">{{ reviewer.reviewer }}</a>
          </div>
        </p>
        <div class="mt-3 border-b dark:border-neutral-800"/>
        <p class="text-right hyphens-auto mb-2 mt-3">
          <div class="text-gray-600 dark:text-gray-400">Published</div>
          <div><b>{{ published }}</b></div>
          <div class="text-gray-600 dark:text-gray-400">Last update</div>
          <div><b>{{ lastUpdate }}</b></div>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {computed, onBeforeMount, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import articles from "../../articles.json" with {type: "json"}
import axios from "axios";
import {mdiArrowLeft} from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";

const route = useRoute()
const router = useRouter()

const articleName = ref("")
const articleContent = ref("")
const title = ref("")
const published = ref("")
const lastUpdate = ref("")
const bibliography = ref([])
const reviewers = ref([])
const authors = ref([])

const tags = ref([])

onBeforeMount(async () => {
  await updateData()
})

watch(route, async () => {
  await updateData()
})

const sortedReviewers = computed(() => {
  if (reviewers.value) {
    return reviewers.value.sort((a, b) => {
      return a.reviewer.localeCompare(b.reviewer)
    })
  }

  return []
})

const updateData = async () => {
  articleName.value = route.params.article

  bibliography.value = [];

  const articleMeta = articles.find(el => {
    return el.name === articleName.value
  })

  if (articleMeta) {
    title.value = articleMeta.title
    published.value = new Date(articleMeta.publishDate).toLocaleDateString();
    lastUpdate.value = new Date(articleMeta.lastUpdate).toLocaleDateString();
    tags.value = articleMeta.tags ? articleMeta.tags : [];
    bibliography.value = articleMeta.bibliography ? articleMeta.bibliography : [];
    reviewers.value = articleMeta.reviewers ? articleMeta.reviewers : []
    authors.value = articleMeta.authors ? articleMeta.authors : []
  }

  await getArticleContent()
}

const tagLink = (tag) => {
  if (route.query && route.query.tags) {
    if (!route.query.tags.split(',').includes(tag)) {
      return `/?tags=${route.query.tags + ',' + tag}`
    } else {
      const filter = route.query.tags.split(',').filter((el) => {
        return el !== tag
      })
      if (filter.length === 0) {
        return `/`
      } else {
        return `/?tags=${filter}`
      }
    }
  } else {
    return `/?tags=${tag}`
  }
}

const getArticleContent = async () => {
  try {
    const response = await axios.get(`/bridgingTheGap/articles/${articleName.value}/html/index.html`)

    if (response.status === 200) {
      articleContent.value = response.data
    }
  } catch (e) {
    // IGNORE ??
  }
}

</script>

<style scoped>

</style>
