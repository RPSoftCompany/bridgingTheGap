<template>
  <div id="body" :class="{ dark: darkTheme }">
    <nav
      class="z-10 antialiased bg-neutral-200 dark:bg-neutral-800 shadow-md dark:shadow-none border-gray-200 sticky top-0"
    >
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">
        <RouterLink to="/">
          <div class="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              v-if="darkTheme"
              class="h-8"
              src="@/assets/logo_dark.svg"
              alt="Bridging the Gap logo"
            />
            <img v-else src="@/assets/logo.svg" class="h-8" alt="Bridging the Gap logo" />
            <div
              class="text-base mt-1 font-semibold whitespace-nowrap hidden xs:block text-black dark:text-gray-50 tracking-wide"
            >
              Bridging the Gap
            </div>
          </div>
        </RouterLink>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-black rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div class="antialiased hidden w-full md:block md:w-auto" id="navbar-default">
          <ul
            class="flex items-center flex-col gap-1 md:gap-0 p-4 md:p-0 mt-4 border bg-transparent border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0"
          >
            <li>
              <RouterLink
                to="/about"
                class="text-black dark:text-white navigation-button"
                aria-current="page"
                >About us
              </RouterLink>
            </li>
            <li class="flex items-center">
              <button aria-label="Change theme" type="button" @click="changeTheme">
                <SvgIcon
                  class="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white card"
                  type="mdi"
                  :path="mdiThemeLightDark"
                  :size="32"
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <main
      class="antialiased bg-neutral-100 dark:bg-neutral-950 text-black dark:text-gray-50 w-full px-4 py-4 flex justify-center items-stretch flex-grow"
    >
      <RouterView v-slot="{ Component }" class="max-w-screen-xl flex flex-grow">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
    <footer
      class="sticky bottom-0 w-full shadow-up dark:shadow-none antialiased pr-4 py-1 hidden md:flex bg-neutral-200 dark:bg-neutral-800 text-black dark:text-white"
    >
      <div class="flex mx-2 justify-start max-w-screen-xl w-full text-[0.65rem]">
        <a
          href="https://github.com/skrzymek/BridgingTheGap"
          property="dct:title"
          rel="cc:attributionURL"
          target="_blank"
          ><b>Bridging the Gap</b></a
        >
        &nbsp;© 2024 by&nbsp;
        <a
          href="https://www.linkedin.com/in/karolskrzymowski/"
          property="cc:attributionName"
          rel="cc:attributionURL dct:creator"
          target="_blank"
          class="link text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
          ><b>Karol Skrzymowski</b></a
        >
        <div>&nbsp;and&nbsp;</div>
        <a
          href="https://www.linkedin.com/in/rados%C5%82aw-przewuski/"
          property="cc:attributionName"
          rel="cc:attributionURL dct:creator"
          target="_blank"
          class="link text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white"
          ><b>Radosław Przewuski</b></a
        >
        &nbsp;is licensed under
        <a href="https://creativecommons.org/licenses/by/4.0" target="_blank" class="flex">
          &nbsp;CC BY 4.0
          <img
            alt=""
            class="cc_image mx-1 self-center"
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg"
          />
          <img
            alt=""
            class="cc_image"
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg"
          />
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { initFlowbite } from 'flowbite'
import { computed, onMounted, ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiThemeLightDark } from '@mdi/js'

const darkTheme = ref(false)
const route = useRoute()

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()

  if (localStorage.theme) {
    darkTheme.value = localStorage.theme === 'true'
  } else {
    darkTheme.value = window.matchMedia('(prefers-color-scheme: dark)').matches
  }
})

const changeTheme = () => {
  darkTheme.value = !darkTheme.value
  localStorage.theme = darkTheme.value
}
</script>

<style scoped lang="scss"></style>
