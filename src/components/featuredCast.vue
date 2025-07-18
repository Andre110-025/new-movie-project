<script setup>
import { onMounted, ref } from 'vue'
import { toast } from 'vue3-toastify'
import apiFunction from '@/app.service'
import { RouterLink } from 'vue-router'

const loading = ref(false)
const featuredCast = ref([])
const featuredScrollContainer = ref(null)
const movieId = 541671

// const scrollRight = (imageContainer) => {
//   imageContainer?.scrollBy({ left: 300, behavior: 'smooth' })
// }

// const scrollLeft = (imageContainer) => {
//   imageContainer?.scrollBy({ left: -300, behavior: 'smooth' })
// }

const getFeaturedCast = async (count = 4) => {
  try {
    loading.value = true
    featuredCast.value = []

    await new Promise((resolve) => setTimeout(resolve, 6000))

    const response = await apiFunction.get(`movie/${movieId}/credits`)
    console.log('Featured cast:', response)

    if (response.status !== 200) {
      throw new Error('Failed to get featured cast')
    }

    featuredCast.value = response.data.cast.slice(0, count)
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

    <div class="relative w-full max-w-[1250px] mx-auto mt-10 px-4">
      <div
        v-if="featuredCast.length"
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-10"
      >
        <div v-for="(img, index) in featuredCast" :key="index" class="overflow-hidden">
          <img
            :src="`https://image.tmdb.org/t/p/w780${img.profile_path}`"
            class="w-full sm:w-full h-[400px] object-cover"
          />
          <p class="w-[300px] text-gray-500 text-[15px] py-1 px-2 rounded">{{ img.name }}</p>
          <p class="text-xl text-black font-semibold p-3">{{ img.character }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
