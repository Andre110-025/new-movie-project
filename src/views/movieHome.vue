<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import trendingMovie from '@/components/trendingMovie.vue'
import PopularMovie from '@/components/popularMovie.vue'
import upComingMovie from '@/components/upComingMovie.vue'
import HeroPage from '@/components/heroPage.vue'
import FooterView from '@/components/footerView.vue'
import FeaturedCast from '@/components/featuredCast.vue'
import NoInternetConnection from '@/components/noInternetConnection.vue'
import TrendingInNigeria from '@/components/trendingInNigeria.vue'
import TrendingInUs from '@/components/trendingInUs.vue'
import TvShows from '@/components/tvShows.vue'

const isBrowserOnline = ref(navigator.onLine) // this check for the browser network status, work like true or false

const checkNetwork = () => {
  isBrowserOnline.value = navigator.onLine
}

onMounted(() => {
  window.addEventListener('online', checkNetwork)
  window.addEventListener('offline', checkNetwork)
})

onBeforeUnmount(() => {
  window.removeEventListener('online', checkNetwork)
  window.removeEventListener('offline', checkNetwork)
})

const reloadPage = () => {
  checkNetwork()

  if (isBrowserOnline.value) {
    location.reload()
  }
}
</script>

<template>
  <div>
    <NoInternetConnection v-if="!isBrowserOnline" :reloadPage="reloadPage" />

    <div v-else>
      <header>
        <HeroPage />
      </header>

      <main>
        <!-- popular movie -->
        <PopularMovie />

        <!-- trending currently in nigeria -->
        <TrendingInNigeria />

        <!-- trending currently in us -->
        <TrendingInUs />

        <!-- new arrival -->
        <trendingMovie />

        <!-- your favorite tv shows -->
        <TvShows />

        <!-- coming soon -->
        <upComingMovie />

        <!-- cast and crew info -->
        <FeaturedCast />
      </main>

      <footer>
        <FooterView />
      </footer>
    </div>
  </div>
</template>
