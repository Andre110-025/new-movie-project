<script setup>
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import apiFunction from '@/app.service'
import { RouterLink } from 'vue-router'

const loading = ref(false)
const featuredCast = ref([])
const featuredScrollContainer = ref(null)
const movieIds = [
  541671, // ballerina
  10191, // Godzilla x Kong: The New Empire
  14537, // Godzilla Minus One
  1071585, // The First Omen
  792307, // Poor Things
  1011477, // The Garfield Movie
  872585, // Oppenheimer
  1011985, // Kung Fu Panda 4
  653346, // Kingdom of the Planet of the Apes
  11544, // Wonka
  634492, // Madam Web
]

// const scrollRight = (imageContainer) => {
//   imageContainer?.scrollBy({ left: 300, behavior: 'smooth' })
// }

// const scrollLeft = (imageContainer) => {
//   imageContainer?.scrollBy({ left: -300, behavior: 'smooth' })
// }

const getFeaturedCast = async () => {
  const selectRandomIds = movieIds[Math.floor(Math.random() * movieIds.length)]
  try {
    loading.value = true
    featuredCast.value = []

    await new Promise((resolve) => setTimeout(resolve, 6000))

    const response = await apiFunction.get(`movie/${selectRandomIds}/credits`)
    console.log('Featured cast:', response)

    if (response.status !== 200) {
      throw new Error('Failed to get featured cast')
    }

    featuredCast.value = response.data.cast.slice(0, 5)
  } catch (err) {
    console.error(err)
    toast.error('Something went wrong. Check Internet Connection')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getFeaturedCast()
})
</script>

<template>
  <div>
    <div class="mt-16 mx-auto max-w-[1250px] flex justify-between items-center px-4">
      <h2 v-if="featuredCast.length" class="text-2xl font-semibold">Featured Cast</h2>
      <RouterLink
        to="/moreFeaturedCast"
        class="flex flex-row items-center gap-1"
        v-if="featuredCast.length"
      >
        <span class="text-[#911b1b] font-medium">See more</span>
        <img src="/next.png" class="w-5 h-5" />
      </RouterLink>
    </div>

    <div v-if="loading" class="relative w-full max-w-[1250px] mx-auto mt-6 px-3 sm:px-4">
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
      <!-- Mobile View for Featured Cast -->
      <div
        v-if="featuredCast.length"
        class="flex gap-3 overflow-x-auto sm:hidden pb-2 scroll-smooth animate-fadeUp"
      >
        <div
          v-for="(img, index) in featuredCast"
          :key="index"
          class="w-[110px] bg-[#111] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 flex-shrink-0"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${img.profile_path}`"
            class="w-[110px] h-[130px] object-cover rounded-t-xl"
          />
          <div class="p-2">
            <p class="text-gray-400 text-xs mb-0.5 truncate">{{ img.name }}</p>
            <p class="text-white text-sm font-semibold leading-tight truncate">
              🎭 {{ img.character }}
            </p>
          </div>
        </div>
      </div>

      <!-- Tablet & Desktop View for Featured Cast -->
      <div
        v-if="featuredCast.length"
        class="hidden sm:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 animate-fadeUp"
      >
        <div
          v-for="(img, index) in featuredCast"
          :key="index"
          class="bg-[#111] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <img
            :src="`https://image.tmdb.org/t/p/w500${img.profile_path}`"
            class="w-full h-[180px] sm:h-[250px] object-cover rounded-t-xl"
          />
          <div class="p-2 sm:p-3">
            <p class="text-gray-400 text-xs sm:text-sm mb-0.5 truncate">{{ img.name }}</p>
            <p class="text-white text-sm sm:text-base font-semibold leading-tight truncate">
              🎭 {{ img.character }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
