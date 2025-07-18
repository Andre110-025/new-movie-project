<script setup>
import apiFunction from '@/app.service'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { toast } from 'vue3-toastify'

const loading = ref(false)
const popularMovie = ref([])
const popularScrollContainer = ref(null)

// reusable scroll functions
// const scrollRight = (imagerContainer) => {
//   imagerContainer?.scrollBy({ left: 300, behavior: 'smooth' })
// }

// const scrollLeft = (imagerContainer) => {
//   imagerContainer?.scrollBy({ left: -300, behavior: 'smooth' })
// }

const getPopularMovies = async (count = 4) => {
  try {
    loading.value = true
    popularMovie.value = []

    await new Promise((resolve) => setTimeout(resolve, 6000))

    const response = await apiFunction.get(`/movie/popular`)
    console.log('Popular Movies:', response)

    if (response.status !== 200) {
      throw new Error('Failed to get popular movies')
    }

    popularMovie.value = response.data.results.slice(0, count)
  } catch (err) {
    console.error(err)
    toast.error('Something went wrong! Check Internet Connection...')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getPopularMovies()
})
</script>

<template>
  <div>
    <div class="mt-16 mx-auto max-w-[1250px] flex justify-between items-center px-4">
      <h2 v-if="popularMovie.length" class="text-2xl font-semibold">Popular Movies</h2>
      <RouterLink
        to="/morePopularMovie"
        class="flex flex-row items-center gap-1"
        v-if="popularMovie.length"
      >
        <span class="text-[#911b1b] font-medium">See more</span>
        <img src="/next.png" class="w-5 h-5" />
      </RouterLink>
    </div>

    <div v-if="loading" class="p-4">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="n in 4" :key="n" class="bg-gray-300 rounded-xl animate-pulse shadow-lg">
          <div class="h-[400px] w-full rounded-t-xl"></div>
          <div class="p-4 space-y-2">
            <div class="h-4 bg-gray-400 rounded w-3/4"></div>
            <div class="h-4 bg-gray-400 rounded w-1/2"></div>
            <div class="h-4 bg-gray-400 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative w-full max-w-[1250px] mx-auto mt-10 px-4">
      <div
        v-if="popularMovie.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10"
      >
        <div v-for="(img, index) in popularMovie" :key="index" class="overflow-hidden">
          <img
            :src="`https://image.tmdb.org/t/p/w780${img.backdrop_path}`"
            class="w-full sm:w-full h-[400px] object-cover"
          />
          <p class="text-gray-500 text-sm py-1 px-4 sm:px-2">🎬 {{ img.release_date }}</p>
          <h5>
            {{ img.title }}
          </h5>
          <div class="flex flex-row items-center justify-between sm:px-3 p-2">
            <img src="/imdb.png" class="w-11 h-5" />
            <p class="text-gray-500 font-semibold">🍅 {{ img.vote_average }} / 10</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
