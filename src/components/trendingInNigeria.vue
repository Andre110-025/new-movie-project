<script setup>
import { onMounted, ref } from 'vue'
import apiFunction from '@/app.service'
import { RouterLink } from 'vue-router'
import { toast } from 'vue3-toastify'

const loading = ref(false)
const trendingInNg = ref([])

const getTrendingNigeria = async (count = 5) => {
  try {
    loading.value = true
    trendingInNg.value = []

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const response = await apiFunction.get(`/movie/now_playing?region=NG`)
    console.log('Nigeria Trending Movies:', response)

    if (response.status !== 200) {
      throw new Error('Failed to get trending movies')
    }

    trendingInNg.value = response.data.results.slice(0, count)
  } catch (err) {
    console.error(err)
    toast.error('Something went wrong! Check Internet Connection...')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getTrendingNigeria()
})
</script>

<template>
  <div>
    <div class="mt-16 mx-auto max-w-[1250px] flex justify-between items-center px-4">
      <h2 v-if="trendingInNg.length" class="text-2xl font-semibold">Nollywood</h2>
      <RouterLink
        to="/moreTrendingInNigeria"
        class="flex flex-row items-center gap-1"
        v-if="trendingInNg.length"
      >
        <span class="text-[#911b1b] font-medium">See more</span>
        <img src="/next.png" class="w-5 h-5" />
      </RouterLink>
    </div>

    <div
      v-if="loading"
      class="relative w-full max-w-[1250px] mx-auto mt-6 px-3 sm:px-4 animate-fadeIn duration-700 ease-in-out"
    >
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
        <div
          v-for="n in 5"
          :key="n"
          class="bg-gray-300 rounded-xl animate-pulse shadow-lg overflow-hidden"
        >
          <div class="w-full h-[180px] sm:h-[250px] bg-gray-200 rounded-t-xl"></div>

          <div class="p-2 sm:p-3 space-y-2">
            <div class="h-4 bg-gray-400 rounded w-3/4"></div>
            <div class="h-4 bg-gray-400 rounded w-1/2"></div>
            <div class="h-4 bg-gray-400 rounded w-1/4"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative w-full max-w-[1250px] mx-auto mt-6 px-3 sm:px-4">
      <!-- Mobile View for popular nigeria movies -->
      <div
        v-if="trendingInNg.length"
        class="flex gap-3 overflow-x-auto sm:hidden pb-2 scroll-smooth animate-fadeUp"
      >
        <div
          v-for="(img, index) in trendingInNg"
          :key="index"
          class="w-[110px] bg-[#111] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 flex-shrink-0"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w780${img.backdrop_path || img.poster_path}`"
            class="w-[110px] h-[130px] object-cover rounded-t-xl"
          />
          <div class="p-2">
            <p class="text-gray-400 text-xs mb-0.5 truncate">🎬 {{ img.release_date }}</p>
            <h5 class="text-white text-sm font-semibold leading-tight truncate">{{ img.title }}</h5>
            <div class="flex items-center justify-between mt-1.5">
              <img src="/imdb.png" class="w-8 h-3" />
              <p class="text-gray-400 text-[11px] font-medium">🍅 {{ img.vote_average }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- desktop and tablet view for trending nigeria Movie -->
      <div
        v-if="trendingInNg.length"
        class="hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 animate-fadeUp"
      >
        <RouterLink
          v-for="movie in trendingInNg"
          :key="movie.id"
          :to="`/movie/${movie.id}`"
          class="bg-[#111] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w780${movie.backdrop_path || movie.poster_path}`"
            class="w-full h-[180px] sm:h-[250px] object-cover rounded-t-xl"
          />
          <div class="p-2 sm:p-3">
            <p class="text-gray-400 text-xs sm:text-sm mb-0.5 truncate">
              🎬 {{ movie.release_date }}
            </p>
            <h5 class="text-white text-sm sm:text-base font-semibold leading-tight truncate">
              {{ movie.title }}
            </h5>
            <div class="flex items-center justify-between mt-1.5">
              <img src="/imdb.png" class="w-8 sm:w-10 h-3 sm:h-4" />
              <p class="text-gray-400 text-xs sm:text-sm font-medium">
                🍅 {{ movie.vote_average }} / 10
              </p>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>
