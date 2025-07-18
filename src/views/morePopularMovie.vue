<script setup>
import apiFunction from '@/app.service'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { toast } from 'vue3-toastify'

const loading = ref(false)
const morePopularMovie = ref([])

const getMorePopularMovies = async (count = 20) => {
  try {
    loading.value = true
    morePopularMovie.value = []

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const response = await apiFunction.get(`/movie/popular`)
    console.log('More Popular Movies:', response)

    if (response.status !== 200) {
      throw new Error('Failed to get popular movies')
    }

    morePopularMovie.value = response.data.results.slice(0, count)
  } catch (err) {
    console.error(err)
    toast.error('Something went wrong! Check Internet Connection...')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getMorePopularMovies()
})
</script>

<template>
  <div class="h-[200px] flex justify-center items-center py-6 px-4 bg-[#911b1b]">
    <h2 class="text-[40px] text-white">Check out more movies here</h2>
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

  <RouterLink
    to="/movieHome"
    class="flex flex-row items-center gap-1 mt-16 mb-4 ml-10"
    v-if="morePopularMovie.length"
  >
    <img src="/next2.png" class="w-6 h-6" />
    <span class="text-[#911b1b] font-medium">Go back</span>
  </RouterLink>

  <div
    v-if="morePopularMovie.length"
    class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4 px-10 pb-10"
  >
    <div v-for="(img, index) in morePopularMovie" :key="index" class="overflow-hidden shadow-lg">
      <img
        :src="`https://image.tmdb.org/t/p/w780${img.backdrop_path}`"
        class="w-full h-[400px] object-cover"
      />
      <p class="text-gray-500 text-sm py-1 px-2 rounded">🎬 {{ img.release_date }}</p>
      <h5 class="text-xl text-black font-semibold p-3">
        {{ img.title }}
      </h5>
      <div class="flex flex-row items-center justify-between p-2">
        <img src="/imdb.png" class="w-11 h-5" />
        <p class="text-gray-500 font-semibold px-3 pt-1">🍅 {{ img.vote_average }} / 10</p>
      </div>
    </div>
  </div>
</template>
