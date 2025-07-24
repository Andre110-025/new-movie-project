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

const getComingMovies = async (count = 5) => {
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
    <div class="mt-16 mx-auto max-w-[1250px] flex justify-between items-center px-4">
      <h2 v-if="comingSoon.length" class="text-2xl font-semibold">Coming Soon</h2>
      <RouterLink
        to="/moreComingSoon"
        class="flex flex-row items-center gap-1"
        v-if="comingSoon.length"
      >
        <span class="text-[#911b1b] font-medium">See more</span>
        <img src="/next.png" class="w-5 h-5" />
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

    <div class="relative w-full max-w-[1250px] mx-auto mt-6 px-3 sm:px-4">
      <div
        v-if="comingSoon.length"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4"
      >
        <div
          v-for="(img, index) in comingSoon"
          :key="index"
          class="bg-[#111] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w780${img.backdrop_path}`"
            class="w-full h-[180px] sm:h-[250px] object-cover rounded-t-xl"
          />
          <div class="p-2 sm:p-3">
            <p class="text-gray-400 text-xs sm:text-sm mb-0.5 truncate">
              🎬 {{ img.release_date }}
            </p>
            <h5 class="text-white text-sm sm:text-base font-semibold leading-tight truncate">
              {{ img.title }}
            </h5>
            <div class="flex items-center justify-between mt-1.5">
              <img src="/imdb.png" class="w-8 sm:w-10 h-3 sm:h-4" />
              <p class="text-gray-400 text-xs sm:text-sm font-medium">
                🍅 {{ img.vote_average }} / 10
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
