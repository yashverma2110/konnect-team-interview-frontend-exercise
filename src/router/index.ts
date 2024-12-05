import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/PageHome.vue'),
    },
    {
      path: '/service/:id',
      name: 'service-details',
      component: () => import('../views/PageServiceDetails.vue'),
    },
  ],
})

export default router
