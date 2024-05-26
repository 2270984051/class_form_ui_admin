import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: "/login",
  },

  {
    path: '/login',
    component: () => import('../views/login/Login.vue')
  },
  {
    path: '/home',
    redirect: "/check",
    component: () => import('../layout/Layout.vue'),
    children: [{
      path: '/check',
      name: 'check',
      component: () => import('../views/check/Check.vue')
    }, {
      path: '/user',
      name: 'user',
      component: () => import('../views/user/User.vue')
    }, {
      path: '/system',
      name: 'system',
      component: () => import('../views/systemInfo/System.vue')
    }, {
      path: '/authority',
      name: 'authority',
      component: () => import('../views/authority/Authority.vue')
    }]
  },

]

const router = new VueRouter({
  routes
})

export default router