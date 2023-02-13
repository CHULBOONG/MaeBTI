import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('../views/MainView.vue')
    },
    {
      path: '/inspect',
      name: 'inspect',
      component: () => import('../views/InspectView.vue')
    },
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/ResultView.vue')
    },
    {
      path: '/jobs',
      name: 'jobs',
      component: () => import('../views/JobsView.vue')
    }
  ]
})

export default router
