import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import(/* webpackChunkName: "form" */ '../views/Form.vue'),
    meta:{
      requieresAuth: true
    }
  },
  {
    path: '/data',
    name: 'Data',
    component: () => import(/* webpackChunkName: "data" */ '../views/Data.vue'),
    meta:{
      requieresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async(to, from, next)=>{
  const requieresAuth = to.matched.some(view => view.meta.requieresAuth);
  requieresAuth && !(await store.dispatch('userMod/setUserState')) ?
   next({name: 'Home'}) :
   next();
})

export default router
