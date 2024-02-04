<template>
  <div id="body" :class="{ dark: darkTheme }">
    <nav
      class="antialiased bg-neutral-200 dark:bg-neutral-800 shadow-md dark:shadow-none border-gray-200 sticky top-0"
    >
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <RouterLink to="/" class="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            v-if="darkTheme"
            src="@/assets/logo_dark.svg"
            class="h-8"
            alt="Bridging the Gap logo"
          />
          <img v-else src="@/assets/logo.svg" class="h-8" alt="Bridging the Gap logo" />
          <span
            class="self-center text-2xl font-semibold whitespace-nowrap hidden xs:block text-black dark:text-gray-50"
            >Bridging the Gap</span
          >
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
            class="flex items-center flex-col gap-2 md:gap-0 p-4 md:p-0 mt-4 border bg-transparent border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0"
          >
            <li>
              <RouterLink
                to="/about"
                class="text-black dark:text-white cursor-pointer navigation-button"
                aria-current="page"
                >About us
              </RouterLink>
            </li>
            <li>
              <SvgIcon
                class="text-black dark:text-white cursor-pointer"
                type="mdi"
                :path="mdiThemeLightDark"
                :size="32"
                @click="changeTheme"
              />
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
          ><b>Karol Skrzymowski</b></a
        >
        <div>&nbsp;and&nbsp;</div>
        <a
          href="https://www.linkedin.com/in/rados%C5%82aw-przewuski/"
          property="cc:attributionName"
          rel="cc:attributionURL dct:creator"
          target="_blank"
          ><b>Radosław Przewuski</b></a
        >
        &nbsp;is licensed under
        <a
          href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1"
          rel="license noopener noreferrer"
          style="display: inline-block"
          target="_blank"
        >
        </a>
        &nbsp;CC BY 4.0
        <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank">
          <img
            alt=""
            class="cc_image mx-1 self-center"
            src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
          />
        </a>
        <a href="https://creativecommons.org/licenses/by/4.0/?ref=chooser-v1" target="_blank">
          <img
            alt=""
            class="cc_image"
            src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
          />
        </a>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { initFlowbite } from 'flowbite'
import { onMounted, ref } from 'vue'
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiThemeLightDark } from '@mdi/js'

const darkTheme = ref(false)

// initialize components based on data attribute selectors
onMounted(() => {
  initFlowbite()

  if (localStorage.theme) {
    darkTheme.value = localStorage.theme === 'true'
  }
})

const changeTheme = () => {
  darkTheme.value = !darkTheme.value
  localStorage.theme = darkTheme.value
}
</script>

<style scoped lang="scss"></style>