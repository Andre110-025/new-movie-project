<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import IconSearch from '../components/IconSearch.vue'
import { toast } from 'vue3-toastify'
import DynamicHeader from './dynamicHeader.vue'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_API_URL

const loading = ref(false)
const searchMovies = ref([])
const error = ref('')
const searchScrollContainer = ref(null)
const search = ref('')

// reusable scroll functions
// const scrollRight = (containerRef) => {
//   containerRef?.scrollBy({ left: 300, behavior: 'smooth' })
// }

// const scrollLeft = (containerRef) => {
//   containerRef?.scrollBy({ left: -300, behavior: 'smooth' })
// }

// const goToSearchPage = () => {
//   const resultsSection = document.getElementById('results')
//   resultsSection?.scrollIntoView({ behavior: 'smooth' })
// }

const searchForMovies = async (count = 6) => {
  if (!search.value) {
    toast.error('Invalid Input ❌')
  }

  try {
    loading.value = true
    searchMovies.value = []

    await new Promise((resolve) => setTimeout(resolve, 4000)) // simulate delay

    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${search.value}`,
    )
    console.log('Search Movies:', response)

    if (response.status !== 200) {
      throw new Error('Failed to search movies')
    }

    searchMovies.value = response.data.results.slice(0, count)
  } catch (err) {
    console.error(err)
    error.value = 'Something went wrong. Please try again...'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <DynamicHeader />
  <!-- <section
    class="relative min-h-screen bg-cover bg-center px-6 py-4"
    style="background-image: url('/1306782.png')"
  >
    <div class="absolute inset-0 bg-black bg-opacity-40 z-0"></div>
    <div class="relative z-10 flex items-center justify-between">
      <img
        src="/ChatGPT_Image_Jun_26__2025__04_28_44_PM-removebg-preview.png"
        class="w-32 h-auto"
      />
      <div class="relative">
        <IconSearch
          class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white pointer-events-none"
        />
        <input
          type="text"
          v-model="search"
          placeholder="What do you want to watch?"
          class="w-[450px] pl-12 pr-4 py-3 rounded-lg text-sm text-white bg-transparent border-2 border-white border-opacity-70 placeholder-white placeholder-opacity-60 focus:ring-1 focus:ring-white focus:border-white outline-none transition"
        />
        <button
          @click="searchForMovies()"
          class="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-[#911b1b] text-white font-semibold text-sm hover:bg-[#b01e1e] focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#911b1b] transition duration-300 shadow-lg"
        >
          Search
        </button>
      </div>
      <RouterLink
        to="/homeView"
        class="w-15 h-15 bg-[#911b1b] rounded-full flex items-center justify-center border-4 border-[#911b1b]"
      >
        <img src="/ChatGPT_Image_Jul_7__2025__12_00_58_PM-removebg-preview.png" class="w-8 h-8" />
      </RouterLink>
    </div>
    <div class="relative z-10 flex flex-col items-start px-10 mt-10">
      <h3 class="text-5xl text-white font-semibold">John Wick 3:<br />Parabellum</h3>
      <div class="mt-3 flex items-center gap-1 text-white">
        <img src="/imdb.png" class="w-11 h-5" />
        <span class="font-bold uppercase text-sm">86.0 / 100</span>
        <img src="/ChatGPT Image Jun 30, 2025, 10_30_49 AM.png" class="ml-6 w-11" />
        <span class="font-bold uppercase text-sm">97%</span>
      </div>
      <p class="text-white mt-3">
        John wick is on the run after killing a member<br />
        of the international assassine guild, and with<br />
        a $14 million price tag on his head, he is the<br />
        target of hit man and woman everywhere.
      </p>
      <button
        class="mt-3 flex items-center w-[165px] gap-2 bg-red-800 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg cursor-pointer transition"
      >
        <svg class="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        <h6 class="text-sm">WATCH TRAILER</h6>
      </button>
    </div>
  </section> -->
  <div>
    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-16 w-16 border-4 border-[#911b1b] border-t-transparent"
      ></div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-100 text-red-700 border border-red-300 rounded-xl p-4 text-center font-medium"
    >
      {{ error }}
    </div>

    <div
      id="results"
      v-if="searchMovies.length"
      ref="searchScrollContainer"
      class="w-[1250px] ml-16 mt-16 flex overflow-x-auto gap-4 scroll-smooth"
      style="scrollbar-width: none; -ms-overflow-style: none"
    >
      <div
        v-for="(img, index) in searchMovies"
        :key="index"
        class="min-w-[300px] overflow-hidden flex-shrink-0"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w780${img.poster_path}`"
          class="w-[300px] h-[400px] object-cover"
        />
        <p class="w-[300px] text-gray-500 text-sm py-1 px-2 rounded">🎬 {{ img.release_date }}</p>
        <h5 class="text-xl text-black font-semibold p-3">
          {{ img.title }}
        </h5>
        <div class="flex flex-row items-center justify-between p-2">
          <img src="/imdb.png" class="w-11 h-5" />
          <p class="text-gray-500 font-semibold px-3 pt-1">🍅 {{ img.vote_average }} / 10</p>
        </div>
      </div>
    </div>
  </div>
</template>
