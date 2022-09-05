export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/main/index.vue')
  },
  {
    path: '/details/:id',
    name: 'Detail',
    component: () => import('@/views/details/index.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login-register/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/login-register/register.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/index.vue')
  }
]
