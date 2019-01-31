import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home.vue'
import register from '../components/register.vue'
import login from '../components/login.vue'
import user from '../components/user.vue'
import beforeEach from './beforeEach'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      name: 'home',
      path: '/',
      component: home
    },
    {
      name: 'auth.register',
      path: '/auth/register',
      component: register
    },
    {
      name: 'auth.login',
      path: '/auth/login',
      component: login
    },
    {
      name: 'user',
      path: '/user',
      component: user,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(beforeEach)

export default router