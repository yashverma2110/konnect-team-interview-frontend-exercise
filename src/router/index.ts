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
    {
      path: '/create-service',
      name: 'create-service',
      component: () => import('../views/PageCreateService.vue'),
    },
    {
      path: '/learn-more',
      name: 'learn-more',
      component: () => import('../views/PageLearnMore.vue'),
    },
  ],
})

export default router
