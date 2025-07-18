<script setup>
import { onMounted, onBeforeUnmount, ref } from 'vue'
import IconSearch from './IconSearch.vue'
import apiFunction from '@/app.service'

const loading = ref(false)
const dynamicScreen = ref([])
const error = ref('')
const search = ref('')
const currentSlide = ref(0)
let sliderId = null

const getDynamicHeader = async () => {
  try {
    loading.value = true
    const response = await apiFunction.get(`/movie/popular`)

    await new Promise((resolve) => setTimeout(resolve, 4000))

    if (response.status !== 200) {
      throw new Error('Failed to fetch movies')
    }

    dynamicScreen.value = response.data.results.slice(0, 5) //taking 5 movie
  } catch (err) {
    console.error(err)
    error.value = 'Something went wrong. Please try again...'
  } finally {
    loading.value = false
  }
}

// setting a timer for 8 sec
const startSlideShow = () => {
  sliderId = setInterval(() => {
    // adding + 1 to currentSlide
    currentSlide.value = (currentSlide.value + 1) % dynamicScreen.value.length
  }, 8000)
}

onMounted(async () => {
  await getDynamicHeader()
  if (dynamicScreen.value.length > 0) startSlideShow()
})

onBeforeUnmount(() => {
  clearInterval(sliderId)
})
</script>

<template>
  <div v-if="loading" class="flex justify-center items-center h-[700px]">
    <div
      class="w-full h-full bg-center bg-cover rounded-lg animate-pulse"
      style="background-image: url('/1306782.png')"
    ></div>
  </div>

  <div
    v-else-if="error"
    class="bg-red-100 text-red-700 border border-red-300 rounded-xl p-4 text-center font-medium"
  >
    {{ error }}
  </div>

  <div
    v-else
    class="relative min-h-screen bg-cover bg-center px-4 sm:px-6 lg:px-10 py-4 transition-all duration-1000"
    :style="`background-image: url(https://image.tmdb.org/t/p/original${dynamicScreen[currentSlide]?.backdrop_path})`"
  >
    <div class="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
    <div class="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <img
        src="/ChatGPT_Image_Jun_26__2025__04_28_44_PM-removebg-preview.png"
        class="w-28 sm:w-32 h-auto"
      />

      <div class="relative w-full max-w-md">
        <IconSearch
          class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none"
        />
        <input
          type="text"
          v-model="search"
          placeholder="Click on the button to search"
          class="w-full pl-12 pr-20 py-2 sm:py-3 rounded-lg text-sm text-white bg-transparent border-2 border-white border-opacity-70 placeholder-white placeholder-opacity-60 focus:ring-1 focus:ring-white focus:border-white outline-none transition"
        />
        <RouterLink
          :to="{ path: '/ImageResult', query: { q: search } }"
          class="absolute right-1 top-1/2 -translate-y-1/2 px-3 sm:px-4 py-2 rounded-lg mainColor text-white font-semibold text-sm hover:bg-[#b01e1e] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#911b1b] transition duration-300 shadow-lg"
        >
          Search
        </RouterLink>
      </div>

      <RouterLink
        to="/homeView"
        class="w-12 h-12 sm:w-15 sm:h-15 mainColor rounded-full flex items-center justify-center border-4 border-[#911b1b]"
      >
        <img
          src="/ChatGPT_Image_Jul_7__2025__12_00_58_PM-removebg-preview.png"
          class="w-6 h-6 sm:w-8 sm:h-8"
        />
      </RouterLink>
    </div>

    <div
      class="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6 px-2 sm:px-4 mt-[50px]"
    >
      <div class="flex flex-col items-start max-w-full lg:max-w-[50%]">
        <h3 class="text-3xl sm:text-5xl text-white font-semibold leading-tight">
          {{ dynamicScreen[currentSlide]?.original_title }}
        </h3>

        <div class="mt-3 flex flex-wrap items-center gap-4 text-white">
          <div class="flex items-center gap-2">
            <img src="/imdb.png" class="w-8 sm:w-11 h-auto" />
            <span class="font-bold uppercase text-sm">
              {{ dynamicScreen[currentSlide]?.popularity }}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <img src="/ChatGPT Image Jun 30, 2025, 10_30_49 AM.png" class="w-8 sm:w-11" />
            <span class="font-bold uppercase text-sm">
              {{ dynamicScreen[currentSlide]?.vote_average }}/ 100
            </span>
          </div>
        </div>

        <p class="text-white mt-3 text-sm sm:text-base max-w-full lg:max-w-md line-clamp-4">
          {{ dynamicScreen[currentSlide]?.overview }}
        </p>

        <button
          class="mt-3 flex items-center justify-center w-full sm:w-[180px] gap-2 mainColor hover:bg-[#b01e1e] text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition"
        >
          <svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
          <span class="text-sm">WATCH TRAILER</span>
        </button>
      </div>

      <div class="hidden lg:flex flex-col gap-2 pl-10">
        <span
          v-for="(slide, index) in dynamicScreen"
          :key="index"
          @click="currentSlide = index"
          :class="[
            'cursor-pointer font-bold transition-all duration-300',
            currentSlide === index ? 'text-2xl scale-110' : 'text-sm text-white/70',
          ]"
          :style="currentSlide === index ? 'color: #911b1b' : ''"
        >
          {{ index + 1 }}
        </span>
      </div>
    </div>
  </div>
</template>
