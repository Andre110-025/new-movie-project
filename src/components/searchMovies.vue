<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_API_URL

const loading = ref(false)
const searchMovies = ref([])
const error = ref('')
const searchScrollContainer = ref(null)
const search = ref('')

// // reusable scroll functions
// const scrollRight = (containerRef) => {
//   containerRef?.scrollBy({ left: 300, behavior: 'smooth' })
// }

// const scrollLeft = (containerRef) => {
//   containerRef?.scrollBy({ left: -300, behavior: 'smooth' })
// }

const searchForMovies = async (count = 12) => {
  try {
    loading.value = true
    searchMovies.value = []

    await new Promise((resolve) => setTimeout(resolve, 4000)) // simulate delay

    const response = await axios.get(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=SEARCH_TERM`,
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
  <div>
    <!-- <div class="mt-16 mx-auto max-w-[1250px] flex items-center justify-between px-4">
      <h2 class="text-4xl text-black font-semibold">You searched for...</h2>
      <div class="flex gap-4">
        <button
          @click="scrollLeft(searchScrollContainer)"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-red-800 text-white hover:bg-red-700 transition duration-300 shadow-md"
        >
          ←
        </button>
        <button
          @click="scrollRight(searchScrollContainer)"
          class="w-10 h-10 flex items-center justify-center rounded-full bg-red-800 text-white hover:bg-red-700 transition duration-300 shadow-md"
        >
          →
        </button>
      </div>
    </div> -->

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
