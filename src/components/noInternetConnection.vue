<script setup>
import IconNoConnection from './IconNoConnection.vue'

defineProps(['reloadPage'])
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-gray-50">
    <div class="flex flex-col items-center p-8 bg-white rounded-2xl shadow-2xl animate-fadeInUp">
      <IconNoConnection />

      <h1 class="text-2xl sm:text-3xl font-bold text-gray-800">No Internet Connection</h1>
      <p class="text-gray-500 mt-2 text-center max-w-[300px]">
        It looks like you’re offline. Please check your connection and try again.
      </p>

      <button
        @click="reloadPage"
        class="mt-6 px-6 py-2 mainColor hover:bg-[#b01e1e] text-white font-semibold rounded-full shadow transition-all duration-300 transform hover:scale-105 active:scale-95"
      >
        Retry
      </button>
    </div>
  </div>
</template>
