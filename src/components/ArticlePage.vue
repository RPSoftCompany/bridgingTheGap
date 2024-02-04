<template>
  <div class="flex justify-between w-full">
    <div class="flex justify-center flex-grow">
      <div class="article">
        <h1 class="mt-3 mb-2.5">{{ title }}</h1>
        <div class="my-2 border-b dark:border-neutral-800 lg:hidden"/>
        <div class="text-justify hyphens-auto my-2 block lg:hidden">
          <span
              class="pr-2 font-bold cursor-pointer navigation-button text-gray-400 hover:text-black hover:dark:text-gray-50"
              v-for="tag of tags"
              :key="tag"
              @click="tagClicked(tag)"
          >
            #{{ tag }}
          </span>
        </div>
        <p class="text-justify hyphens-auto mb-2 block lg:hidden">
          <div class="text-gray-400">Published</div>
          <b>{{ published }}</b>
          <div class="text-gray-400">Last update</div>
          <b>{{ lastUpdate }}</b>
        </p>
        <div class="my-2 border-b dark:border-neutral-800 lg:hidden"/>
        <!--      <p class="text-justify hyphens-auto">Placeholder for any disclaimers like license usage, naming conventions,-->
        <!--        anything...</p>-->
        <div v-html="articleContent"/>
        <p class="lg:hidden" v-if="reviewers.length > 0">
          <div class="mt-3 border-b dark:border-neutral-800"/>
          <h5>Article Reviewers</h5>
          <div v-for="reviewer of reviewers" :key="reviewer.reviewer">
            <a target="_blank" class="link text-black"
               :href="reviewer.link">{{ reviewer.reviewer }}</a>
          </div>
        </p>
        <div v-if="bibliography.length > 0">
          <div class="mt-3 border-b dark:border-neutral-800"/>
          <h5>Bibliography</h5>
          <a class="link" target="_blank" v-for="bib of bibliography" :key="bib.title" :href="bib.link">{{
              bib.title
            }}</a>
        </div>

        <!--        <p class="text-justify hyphens-auto">-->
        <!--          Placeholder for credits given to peer reviewers, contributors, etc.-->
        <!--        </p>-->
      </div>
    </div>
    <div class="w-[10rem] self-stretch border-l dark:border-neutral-900 ml-3 text-right hidden lg:block">
      <div class="mx-3 sticky top-24">
        <h5 class="mt-0 mb-2">Tags</h5>
        <div>
          <div
              class="inline-block pl-2 pt-1 text-gray-400 hover:text-black hover:dark:text-gray-50 cursor-pointer"
              v-for="tag of tags"
              :key="tag"
              @click="tagClicked(tag)"
          >#{{ tag }}
          </div>
        </div>
        <div class="mt-3 border-b dark:border-neutral-800" v-if="reviewers.length > 0"/>
        <p class="text-right hyphens-auto mb-2 mt-3" v-if="reviewers.length > 0">
          <h5 class="">Article Reviewers</h5>
          <div v-for="reviewer of reviewers" :key="reviewer.reviewer">
            <a target="_blank" class="link text-black"
               :href="reviewer.link">{{ reviewer.reviewer }}</a>
          </div>
        </p>
        <div class="mt-3 border-b dark:border-neutral-800"/>
        <p class="text-right hyphens-auto mb-2 mt-3">
          <div class="text-gray-400">Published</div>
          <div><b>{{ published }}</b></div>
          <div class="text-gray-400">Last update</div>
          <div><b>{{ lastUpdate }}</b></div>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onBeforeMount, ref, watch} from "vue";
import {useRoute, useRouter} from "vue-router";
import articles from "../../articles.json" with {type: "json"}
import axios from "axios";

const route = useRoute()
const router = useRouter()

const articleName = ref("")
const articleContent = ref("")
const title = ref("")
const published = ref("")
const lastUpdate = ref("")
const bibliography = ref([])
const reviewers = ref([])

const tags = ref([])

onBeforeMount(async () => {
  await updateData()
})

watch(route, async () => {
  await updateData()
})

const updateData = async () => {
  articleName.value = route.params.article

  bibliography.value = [];

  const articleMeta = articles.find(el => {
    return el.name === articleName.value
  })

  if (articleMeta) {
    title.value = articleMeta.title
    published.value = articleMeta.publishDate;
    lastUpdate.value = articleMeta.lastUpdate;
    tags.value = articleMeta.tags ? articleMeta.tags : [];
    bibliography.value = articleMeta.bibliography ? articleMeta.bibliography : [];
    reviewers.value = articleMeta.reviewers ? articleMeta.reviewers : []
  }

  await getArticleContent()
}

const tagClicked = (tag) => {
  if (route.query.tags) {
    if (!route.query.tags.split(",").includes(tag)) {
      router.push(`/?tags=${route.query.tags + ',' + tag}`)
    }
  } else {
    router.push(`/?tags=${tag}`)
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
