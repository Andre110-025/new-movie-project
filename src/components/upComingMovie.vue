<script setup>
import apiFunction from '@/app.service'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { toast } from 'vue3-toastify'

const loading = ref(false)
const comingSoon = ref([])
const comingScrollContainer = ref(null)

// const scrollRight = (imagerContainer) => {
//   imagerContainer?.scrollBy({ left: 300, behavior: 'smooth' })
// }

// const scrollLeft = (imagerContainer) => {
//   imagerContainer?.scrollBy({ left: -300, behavior: 'smooth' })
// }

const getComingMovies = async (count = 4) => {
  try {
    loading.value = true
    comingSoon.value = []

    await new Promise((resolve) => setTimeout(resolve, 6000))

    const response = await apiFunction.get(`/movie/upcoming`)
    console.log('Coming Movies:', response)

    if (response.status !== 200) {
      throw new Error('Failed to get coming movies')
    }

    comingSoon.value = response.data.results.slice(0, count)
  } catch (err) {
    console.error(err)
    toast.error('Something went wrong! Check Internet Connection...')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getComingMovies()
})
</script>

<template>
  <div>
    <div class="mt-16 mx-auto max-w-[1250px] flex items-end justify-between px-4">
      <h2 v-if="comingSoon.length">Coming Soon</h2>
      <RouterLink to="/moreComingSoon" class="flex flex-row items-center" v-if="comingSoon.length">
        <span class="text-[#911b1b] font-medium">See more</span>
        <img src="/next.png" class="w-6 h-6" />
      </RouterLink>
    </div>

    <div v-if="loading" class="p-6">
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
        v-if="comingSoon.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10"
      >
        <div v-for="(img, index) in comingSoon" :key="index" class="overflow-hidden">
          <img
            :src="`https://image.tmdb.org/t/p/w780${img.backdrop_path}`"
            class="w-full sm:w-full h-[400px] object-cover"
          />
          <p class="w-[300px] text-gray-500 text-sm py-1 px-2 rounded">🎬 {{ img.release_date }}</p>
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
