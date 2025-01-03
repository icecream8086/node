import { createRouter, createWebHistory } from 'vue-router'
console.log(import.meta.env.BASE_URL);

const router = createRouter({
  
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'default',
      component:  () => import('../views/login.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component:  () => import('../views/login.vue'),
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/dashboard.vue'),
    },
    {
      path: '/Personal_info',
      name: 'Personal_info.vue',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Personal_info.vue'),
    },
    {
      path: '/update_password',
      name: 'update_password',
      component: () => import('../views/update_password.vue'),
    },
    
  ],
})

export default router
