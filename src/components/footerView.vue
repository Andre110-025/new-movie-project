<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <footer class="bg-[#1a1a1a] text-gray-400 mt-16 pt-8 pb-6">
    <div class="flex justify-center gap-5 mb-6">
      <img
        src="/facebook2.png"
        class="w-6 h-6 cursor-pointer hover:scale-110 transition duration-300"
      />
      <img
        src="/twitter2.png"
        class="w-6 h-6 cursor-pointer hover:scale-110 transition duration-300"
      />
      <img
        src="/instagram2.png"
        class="w-6 h-6 cursor-pointer hover:scale-110 transition duration-300"
      />
      <img
        src="/youtube (3).png"
        class="w-6 h-6 cursor-pointer hover:scale-110 transition duration-300"
      />
    </div>

    <div
      class="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6 text-center mb-6"
    >
      <RouterLink
        class="cursor-pointer text-white hover:text-[#911b1b] transition-colors duration-300"
        to="/termsOfUse"
      >
        Terms of Use
      </RouterLink>

      <RouterLink
        class="cursor-pointer text-white hover:text-[#911b1b] transition-colors duration-300"
        to="/privacyPolicy"
      >
        Privacy Policy
      </RouterLink>

      <RouterLink
        class="cursor-pointer text-white hover:text-[#911b1b] transition-colors duration-300"
        to="/pressRoom"
      >
        Press Room
      </RouterLink>
    </div>

    <div class="border-t border-gray-700 w-[90%] mx-auto mb-4"></div>

    <p class="text-center text-white text-sm sm:text-base">
      &copy; 2025 MovieBox by <span class="text-[#911b1b] font-semibold">ANDRE</span>. All rights
      reserved.
    </p>
  </footer>
</template>
