import { Dialog } from 'vant'
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: { requireAuth: false }
  },
  {
    path: '/',
    // name: 'layout',
    component: () => import('@/views/layout'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home'),
        meta: { requireAuth: false }
      },
      {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/qa'),
        meta: { requireAuth: false }
      },
      {
        path: '/video',
        name: 'video',
        component: () => import('@/views/video'),
        meta: { requireAuth: false }
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my'),
        meta: { requireAuth: false }
      }
    ],
    meta: { requireAuth: false }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
    meta: { requireAuth: false }
  },
  {
    path: '/article/:article_id/:aut_id',
    name: 'article',
    component: () => import('@/views/article'),
    props: true,
    meta: { requireAuth: false }
  },
  {
    path: '/user/profile',
    name: 'profile',
    component: () => import('@/views/user-profile'),
    meta: { requireAuth: false }
  },
  {
    path: '/user/chat',
    name: 'userchat',
    component: () => import('@/views/user-chat'),
    meta: { requireAuth: true }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach((to,from,next) => {
  if (to.meta.requireAuth) {
    if (store.state.user) {
      next()
    } else {
      Dialog.confirm({
        title: '访问提示',
        message: '该功能需要登录才能访问，确认登录吗？'
      }).then(() => {
        router.replace({ 
          name: 'login',
          query: {
            redirect: router.currentRoute.fullPath
          }
         })
      }).catch(() => {
        next(false)
      })
    }  
  } else {
    next()
  }
})

export default router
