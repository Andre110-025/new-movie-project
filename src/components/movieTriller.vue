<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_URL = import.meta.env.VITE_API_URL

const loading = ref(false)
const movieTriler = ref([])
const error = ref('')

const getMovieTriller = async (count = 3) => {
  try {
    loading.value = true
    movieTriler.value = []

    const response = await axios.get(`${BASE_URL}/movie/550/videos?api_key=${API_KEY}`)
    console.log('Triller:', response)

    if (response.status !== 200) {
      throw new Error('Failed to get official triller')
    }

    movieTriler.value = response.data.results.slice(0, count)
  } catch (err) {
    console.error(err)
    error.value = 'Something went wrong. Please try again...'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getMovieTriller()
})
</script>

<template>
  <div>
    <div class="mt-16 mx-auto max-w-[1250px] flex items-center justify-between px-4">
      <h2 class="text-4xl text-black font-semibold">Exclusive Video Triller</h2>
    </div>

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

    <div v-else class="flex flex-row flex-wrap">
      <div
        v-for="(video, index) in movieTriler"
        :key="index"
        class="flex flex-col items-center gap-3 ml-16 mt-16"
      >
        <iframe
          v-if="video.site === 'YouTube'"
          :src="`https://www.youtube.com/embed/${video.key}`"
          frameborder="0"
          allowfullscreen
          class="w-[360px] h-[300px] shadow-md"
        ></iframe>
        <p class="text-gray-600 text-base text-center font-medium">
          {{ video.name }}
        </p>
      </div>
    </div>
  </div>
</template>
