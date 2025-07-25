<script setup>
import apiFunction from '@/app.service'
import FooterView from '@/components/footerView.vue'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { toast } from 'vue3-toastify'

const loading = ref(false)
const moreTrendingMovie = ref([])
const isFetchingMovie = ref(false) // fetching for more movies
const page = ref(1)
const moviesPerPage = 10
const allMoviesFetched = ref(false) // could be thousands

const getMoreTrendingMovies = async () => {
  if (isFetchingMovie.value || allMoviesFetched.value) return

  isFetchingMovie.value = true
  try {
    const response = await apiFunction.get(`/trending/movie/week?page=${page.value}`)
    console.log('More Trending Movies (page ' + page.value + '):', response)

    if (response.status !== 200) {
      throw new Error('Failed to get popular movies')
    }

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const results = response.data.results

    if (results.length) {
      moreTrendingMovie.value.push(...results.slice(0, moviesPerPage))
      page.value++
    } else {
      allMoviesFetched.value = true
    }
  } catch (err) {
    console.error(err)
    toast.error('Something went wrong! Check Internet Connection...')
  } finally {
    loading.value = false
    isFetchingMovie.value = false
  }
}

const handleScroll = () => {
  const scrollY = window.scrollY
  const viewportHeight = window.innerHeight
  const fullHeight = document.documentElement.scrollHeight

  if (scrollY + viewportHeight >= fullHeight * 0.9) {
    getMoreTrendingMovies()
  }
}

onMounted(() => {
  loading.value = true
  getMoreTrendingMovies()
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="h-[200px] flex justify-center items-center py-6 px-4 bg-[#911b1b]">
    <h2 class="text-[28px] sm:text-[40px] text-white text-center sm:text-left">
      Check out more Trending movies here
    </h2>
  </div>

  <div v-if="loading" class="relative w-full max-w-[1250px] mx-auto mt-6 px-3 sm:px-4">
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
      <div
        v-for="n in 10"
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

  <RouterLink
    to="/movieHome"
    class="flex items-center gap-1 mt-9 px-3 sm:px-4 lg:px-0 max-w-[1250px] mx-auto"
    v-if="moreTrendingMovie.length"
  >
    <img src="/next2.png" class="w-5 h-5 sm:w-6 sm:h-6" />
    <span class="text-[#911b1b] font-medium text-sm sm:text-base">Go back</span>
  </RouterLink>

  <div class="relative w-full max-w-[1250px] mx-auto mt-6 px-3 sm:px-4">
    <div
      v-if="moreTrendingMovie.length"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 animate-fadeUp"
    >
      <div
        v-for="(img, index) in moreTrendingMovie"
        :key="index"
        class="bg-[#111] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${img.backdrop_path || img.poster_path}`"
          class="w-full h-[180px] sm:h-[250px] object-cover rounded-t-xl"
        />
        <div class="p-2 sm:p-3">
          <p class="text-gray-400 text-xs sm:text-sm mb-0.5 truncate">🎬 {{ img.release_date }}</p>
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
  <div v-if="isFetchingMovie" class="flex justify-center py-6">
    <div
      class="w-8 h-8 border-4 border-[#911b1b] border-t-transparent rounded-full animate-spin"
    ></div>
  </div>

  <div v-if="allMoviesFetched" class="flex justify-center py-6">
    <p class="text-[#911b1b] text-lg font-semibold">You’ve reached the end of the list!</p>
  </div>
  <footer>
    <FooterView />
  </footer>
</template>
