export default [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/main/index.vue')
      },
      {
        path: '/profile',
        name: 'Profile',
        component: () => import('@/views/profile/index.vue')
      }
    ]
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
  }
]
