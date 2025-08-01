import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/movieHome',
    },
    {
      path: '/homeView',
      name: 'HomeView',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/movieHome',
      name: 'movieHome',
      component: () => import('@/views/movieHome.vue'),
    },
    {
      path: '/movie/:id',
      name: 'movieDetails',
      component: () => import('@/views/movieDetails.vue'),
    },
    {
      path: '/ImageResult',
      name: 'ImageResult',
      component: () => import('@/views/ImageResult.vue'),
    },
    {
      path: '/morePopularMovie',
      name: 'morePopularMovie',
      component: () => import('@/views/morePopularMovie.vue'),
    },
    {
      path: '/moreTrendingInNigeria',
      name: 'moreTrendingInNigeria',
      component: () => import('@/views/moreTrendingInNigeria.vue'),
    },
    {
      path: '/moreTrendingInUs',
      name: 'moreTrendingInUs',
      component: () => import('@/views/moreTrendingInUs.vue'),
    },
    {
      path: '/moreTrendingMovie',
      name: 'moreTrendingMovie',
      component: () => import('@/views/moreTrendingMovie.vue'),
    },
    {
      path: '/tvShows',
      name: 'tvShows',
      component: () => import('@/views/moreTvShows.vue'),
    },
    {
      path: '/moreTvShows',
      name: 'moreTvShows',
      component: () => import('@/views/moreTvShows.vue'),
    },
    {
      path: '/moreComingSoon',
      name: 'moreComingSoon',
      component: () => import('@/views/moreComingSoon.vue'),
    },
    {
      path: '/moreFeaturedCast',
      name: 'moreFeaturedCast',
      component: () => import('@/views/moreFeaturedCast.vue'),
    },
    {
      path: '/termsOfUse',
      name: 'termsOfUse',
      component: () => import('@/views/termsOfUse.vue'),
    },
    {
      path: '/privacyPolicy',
      name: 'privacyPolicy',
      component: () => import('@/views/privacyPolicy.vue'),
    },
    {
      path: '/pressRoom',
      name: 'pressRoom',
      component: () => import('@/views/pressRoom.vue'),
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

export default router
