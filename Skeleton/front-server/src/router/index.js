import Vue from 'vue'
import VueRouter from 'vue-router'
import CompareView from '@/views/CompareView'
import CreateView from '@/views/CreateView'
import DetailView from '@/views/DetailView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import MainPageView from '@/views/MainPageView'
import DetailDeposit from '@/components/DetailDeposit'
import DetailSaving from '@/components/DetailSaving'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPageView',
    component: MainPageView
  },

  {
    path: '/create',
    name: 'CreateView',
    component: CreateView
  },

  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },

  {
    path: '/login',
    name: 'LogInView',
    component: LogInView
  },

  {
    path: '/id',
    name: 'DetailView',
    component: DetailView,
  },

  {
    path : '/rate-comparison',
    name : 'CompareView',
    component : CompareView,
  },
  {
    path: '/detaildeposit/:id', 
    name: 'DetailDeposit',
    component: DetailDeposit,
  },
  {
    path: '/detailsaving/:id', 
    name: 'DetailSaving',
    component: DetailSaving,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
