<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import apiFunction from '@/app.service'

const route = useRoute()
const movieId = route.params.id

const movie = ref(null)
const cast = ref([])

onMounted(async () => {
  try {
    const response = await apiFunction.getMovieDetails(movieId)
    movie.value = response.data

    const credits = await apiFunction.getMovieCredits(movieId)
    cast.value = credits.data.cast.slice(0, 5)
  } catch (err) {
    console.error('Error fetching movie details:', err)
  }
})
</script>

<template>
  <div class="text-white p-4">
    <div v-if="!movie">
      <p>Loading...</p>
    </div>
    <div v-else>
      <h1 class="text-2xl font-bold mb-2">{{ movie.title }}</h1>
      <p class="mb-4">{{ movie.overview }}</p>
      <img
        v-if="movie.backdrop_path"
        :src="`https://image.tmdb.org/t/p/w780${movie.backdrop_path}`"
        class="rounded-lg mb-4"
      />
      <h2 class="text-xl font-semibold mb-2">Cast</h2>
      <ul>
        <li v-for="actor in cast" :key="actor.id">{{ actor.name }} as {{ actor.character }}</li>
      </ul>
    </div>
  </div>
</template>
