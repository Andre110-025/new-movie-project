<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import apiFunction from '@/app.service'
import { toast } from 'vue3-toastify'

const route = useRoute()
const movieId = route.params.id

const movieDetails = ref([])
const movieCast = ref([])
const loading = ref(false)

const getMovieDetails = async () => {
  try {
    loading.value = true

    const response = await apiFunction.get(`/movie/${movieId}`)
    movieDetails.value = response.data
    console.log('movie details:', response)

    const res = await apiFunction.get(`/movie/${movieId}/credits`)
    movieCast.value = res.data.cast.slice(0, 25)
    console.log('movie cast:', res)
  } catch (err) {
    console.error(err)
    toast.error('Something went wrong! Check Internet Connection...')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getMovieDetails()
})

// onMounted(async () => {
//   try {
//     const detailsRes = await apiFunction.get(`/movie/${movieId}`)
//     movieDetails.value = detailsRes.data

//     const castRes = await apiFunction.get(`/movie/${movieId}/credits`)
//     movieCast.value = castRes.data.cast.slice(0, 20)
//   } catch (err) {
//     console.error('Failed to fetch movie details or cast:', err)
//   }
// })
</script>

<template>
  <div
    v-if="loading"
    class="flex justify-center items-center h-64 animate-fadeIn duration-700 ease-in-out"
  >
    <div
      class="animate-spin rounded-full h-16 w-16 border-4 border-[#911b1b] border-t-transparent"
    ></div>
  </div>

  <div
    v-if="movieDetails?.backdrop_path"
    class="relative min-h-screen bg-cover bg-center px-4 sm:px-6 lg:px-10 py-6 flex items-center"
    :style="`background-image: url(https://image.tmdb.org/t/p/original${movieDetails.backdrop_path})`"
  >
    <div class="absolute inset-0 bg-black bg-opacity-50"></div>
    <div class="flex flex-col">
      <div class="relative z-10 max-w-3xl text-white space-y-4">
        <h1 class="text-3xl sm:text-4xl font-bold">
          {{ movieDetails.title }}
        </h1>
        <p class="text-base sm:text-lg leading-relaxed line-clamp-4">
          {{ movieDetails.overview }}
        </p>
      </div>
      <div class="z-10 mt-3 flex flex-wrap items-center gap-4 text-white">
        <div class="flex items-center gap-2">
          <img src="/imdb.png" class="w-8 sm:w-11 h-auto" />
          <span class="font-bold uppercase text-base sm:text-[inherit]">
            {{ movieDetails.popularity }}
          </span>
        </div>
        <div class="flex items-center gap-2">
          <img src="/ChatGPT Image Jun 30, 2025, 10_30_49 AM.png" class="w-8 sm:w-11" />
          <span class="font-bold uppercase text-base sm:text-[inherit]">
            {{ movieDetails.vote_average }}/ 100
          </span>
        </div>
      </div>
    </div>
  </div>

  <RouterLink
    to="/movieHome"
    class="flex items-center gap-1 mt-9 px-3 sm:px-4 lg:px-0 max-w-[1250px] mx-auto"
    v-if="movieCast.length"
  >
    <img src="/next2.png" class="w-5 h-5 sm:w-6 sm:h-6" />
    <span class="text-[#911b1b] font-medium text-sm sm:text-base">Go back</span>
  </RouterLink>

  <div class="relative w-full max-w-[1250px] mx-auto mt-6 px-3 sm:px-4 text-white">
    <!-- Mobile View -->
    <div
      v-if="movieCast.length"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 animate-fadeUp"
    >
      <div
        v-for="(actor, index) in movieCast"
        :key="index"
        class="bg-[#111] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w780${actor.profile_path || actor.backdrop_path}`"
          class="w-full h-[180px] sm:h-[250px] object-cover rounded-t-xl"
          alt="No profile found"
        />
        <div class="p-2">
          <p class="text-gray-400 text-xs sm:text-sm mb-0.5 truncate">{{ actor.name }}</p>
          <p class="text-white text-sm sm:text-base font-semibold leading-tight truncate">
            🎭 {{ actor.character }}
          </p>
        </div>
      </div>
    </div>

    <!-- desktop and tablet view -->
    <div
      v-if="movieCast.length"
      class="mt-5 hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 animate-fadeUp"
    >
      <div
        v-for="(actor, index) in movieCast"
        :key="index"
        class="bg-[#111] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${actor.profile_path || actor.backdrop_path}`"
          class="w-full h-[180px] sm:h-[250px] object-cover rounded-t-xl"
          alt="No image found"
        />
        <div class="p-2 sm:p-3">
          <p class="text-gray-400 text-xs sm:text-sm mb-0.5 truncate">{{ actor.name }}</p>
          <p class="text-white text-sm sm:text-base font-semibold leading-tight truncate">
            🎭 {{ actor.character }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
