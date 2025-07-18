import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/movieHome',
      name: 'movieHome',
      component: () => import('@/views/movieHome.vue'),
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
      path: '/moreTrendingMovie',
      name: 'moreTrendingMovie',
      component: () => import('@/views/moreTrendingMovie.vue'),
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
