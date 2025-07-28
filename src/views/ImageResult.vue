<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import apiFunction from '@/app.service'
import FooterView from '@/components/footerView.vue'
import IconSearchTwo from '@/components/IconSearchTwo.vue'

const loading = ref(false)
const search = ref('')
const searchedMovie = ref([])
const route = useRoute()
const error = ref('')
const suggestion = ref([])

const getSuggestion = async () => {
  if (search.value.trim().length < 3) {
    suggestion.value = []
    return
  }

  try {
    const response = await apiFunction.get(`/search/movie?query=${search.value}`)
    suggestion.value = response.data.results.slice(0, 4)
  } catch (err) {
    console.error(err)
  }
}

const selectSuggestion = (title) => {
  search.value = title
  suggestion.value = []
  getSearchedMovie()
}

const getSearchedMovie = async (count = 20) => {
  const query = search.value || route.query.q
  if (!query) {
    toast.error('Invalid Input ❌')
    return
  }

  try {
    loading.value = true
    searchedMovie.value = []
    error.value = ''

    const response = await apiFunction.get(`/search/movie?query=${query}`)
    console.log('You searched:', response)

    if (response.status !== 200) {
      throw new Error('Failed to search movies')
    }

    searchedMovie.value = response.data.results.slice(0, count)

    if (response.data.results.length === 0) {
      error.value = '⚠️ No results found check for another movie'
    }
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
        <IconSearchTwo class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white" />
        <input
          type="text"
          v-model="search"
          @input="getSuggestion"
          placeholder="Search for movies..."
          class="w-full pl-12 pr-20 py-3 sm:py-[10px] rounded-lg text-sm text-white bg-transparent border-2 border-white border-opacity-70 placeholder-white placeholder-opacity-60 focus:ring-1 focus:ring-white focus:border-white outline-none transition"
        />
        <ul
          v-if="suggestion.length && search"
          class="absolute left-0 right-0 top-full bg-[#111] text-white rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto z-50"
        >
          <li
            v-for="(movie, index) in suggestion"
            :key="index"
            @click="selectSuggestion(movie.title)"
            class="p-2 hover:bg-primary cursor-pointer"
          >
            {{ movie.title }}
          </li>
        </ul>
        <button
          @click="getSearchedMovie()"
          class="absolute right-1 top-1/2 -translate-y-1/2 px-3 sm:px-4 py-2 rounded-lg bg-white text-[#911b1b] font-semibold text-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 transition duration-300 shadow-lg"
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

    <div
      v-else-if="error"
      class="flex flex-col justify-center items-center h-64 animate-fadeUp space-y-4"
    >
      <p class="text-[#911b1b] text-lg font-semibold text-center">
        {{ error }}
      </p>
      <RouterLink to="/movieHome" class="flex flex-row items-center gap-1">
        <img src="/next2.png" class="w-6 h-6" />
        <span class="text-[#911b1b] font-medium">Go back</span>
      </RouterLink>
    </div>

    <RouterLink
      to="/movieHome"
      class="flex items-center gap-1 mt-9 px-3 sm:px-4 lg:px-0 max-w-[1250px] mx-auto"
      v-if="searchedMovie.length"
    >
      <img src="/next2.png" class="w-5 h-5 sm:w-6 sm:h-6" />
      <span class="text-[#911b1b] text-sm sm:text-base">Go back</span>
    </RouterLink>

    <div class="relative w-full max-w-[1250px] mx-auto mt-6 px-3 sm:px-4">
      <div
        v-if="searchedMovie.length"
        class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 animate-fadeUp"
      >
        <div
          v-for="(img, index) in searchedMovie"
          :key="index"
          class="bg-[#111] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${img.backdrop_path || img.poster_path}`"
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
  <footer>
    <FooterView />
  </footer>
</template>
