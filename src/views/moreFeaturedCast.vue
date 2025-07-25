<script setup>
import apiFunction from '@/app.service'
import FooterView from '@/components/footerView.vue'
import { onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { toast } from 'vue3-toastify'

const loading = ref(false)
const moreFeaturedCast = ref([])
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

const getMoreFeaturedCast = async () => {
  const selectRandomIds = movieIds[Math.floor(Math.random() * movieIds.length)]
  try {
    loading.value = true
    moreFeaturedCast.value = []

    await new Promise((resolve) => setTimeout(resolve, 2000))

    const response = await apiFunction.get(`movie/${selectRandomIds}/credits`)
    console.log('More Popular Movies:', response)

    if (response.status !== 200) {
      throw new Error('Failed to get popular movies')
    }

    moreFeaturedCast.value = response.data.cast.slice(0, 26)
  } catch (err) {
    console.error(err)
    toast.error('Something went wrong! Check Internet Connection...')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  getMoreFeaturedCast()
})
</script>

<template>
  <div class="h-[200px] flex justify-center items-center py-6 px-4 bg-[#911b1b]">
    <h2 class="text-[28px] sm:text-[40px] text-white text-center sm:text-left">
      Check out for more cast here
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
    v-if="moreFeaturedCast.length"
  >
    <img src="/next2.png" class="w-5 h-5 sm:w-6 sm:h-6" />
    <span class="text-[#911b1b] font-medium text-sm sm:text-base">Go back</span>
  </RouterLink>

  <div class="relative w-full max-w-[1250px] mx-auto mt-6 px-3 sm:px-4">
    <div
      v-if="moreFeaturedCast.length"
      class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 animate-fadeUp"
    >
      <div
        v-for="(img, index) in moreFeaturedCast"
        :key="index"
        class="bg-[#111] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
      >
        <img
          :src="`https://image.tmdb.org/t/p/w500${img.profile_path}`"
          class="w-full h-[180px] sm:h-[250px] object-cover rounded-t-xl"
        />
        <div class="p-2 sm:p-3">
          <p class="text-gray-400 text-xs sm:text-sm mb-0.5 truncate">
            {{ img.name }}
          </p>
          <p class="text-white text-sm sm:text-base font-semibold leading-tight truncate">
            🎭 {{ img.character }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <footer>
    <FooterView />
  </footer>
</template>
