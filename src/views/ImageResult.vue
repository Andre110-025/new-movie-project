<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import apiFunction from '@/app.service'

const loading = ref(false)
const search = ref('')
const searchedMovie = ref([])
const route = useRoute()

const getSearchedMovie = async (count = 20) => {
  const query = search.value || route.query.q
  if (!query) {
    toast.error('Invalid Input ❌')
    return
  }

  try {
    loading.value = true
    searchedMovie.value = []

    const response = await apiFunction.get(`/search/movie?query=${query}`)
    console.log('You searched:', response)

    if (response.status !== 200) {
      throw new Error('Failed to search movies')
    }

    searchedMovie.value = response.data.results.slice(0, count)
  } catch (err) {
    console.error(err)
    toast.error('Something went wrong! Check Internet Connection...')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (route.query.q) {
    search.value = route.query.q
    getSearchedMovie()
  }
})
</script>

<template>
  <div class="min-h-screen bg-white text-gray-800">
    <div class="h-[250px] flex justify-center items-center py-6 px-4 bg-[#911b1b]">
      <div class="relative w-full max-w-2xl">
        <IconSearch class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
        <input
          type="text"
          v-model="search"
          placeholder="Search for movies..."
          class="w-full pl-12 pr-20 py-3 rounded-full text-sm text-gray-800 bg-white border border-gray-300 placeholder-gray-400 focus:ring-2 focus:ring-[#911b1b] outline-none transition"
        />
        <button
          @click="getSearchedMovie()"
          class="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 rounded-full bg-[#911b1b] text-white font-semibold text-sm hover:bg-[#b01e1e] transition duration-300"
        >
          Search
        </button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center items-center h-64">
      <div
        class="animate-spin rounded-full h-16 w-16 border-4 border-[#911b1b] border-t-transparent"
      ></div>
    </div>

    <RouterLink
      to="/movieHome"
      class="flex flex-row items-center gap-1 mt-16 mb-4 ml-10"
      v-if="searchedMovie.length"
    >
      <img src="/next2.png" class="w-6 h-6" />
      <span class="text-[#911b1b] font-medium">Go back</span>
    </RouterLink>

    <div v-if="searchedMovie.length" class="p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(img, index) in searchedMovie"
          :key="index"
          class="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${img.poster_path}`"
            alt="Movie Poster"
            class="w-full h-[400px] object-cover"
          />

          <div class="p-4">
            <p class="text-gray-500 text-sm mb-2">🎬 {{ img.release_date }}</p>
            <h5 class="text-lg text-black font-semibold mb-2">
              {{ img.title }}
            </h5>
            <div class="flex items-center justify-between">
              <img src="/imdb.png" class="w-11 h-5" alt="IMDb" />
              <p class="text-gray-700 font-medium">🍅 {{ img.vote_average }} / 10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
