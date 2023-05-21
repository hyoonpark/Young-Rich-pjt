import Vue from 'vue'
import VueRouter from 'vue-router'
import CompareView from '@/views/CompareView'
import CreateView from '@/views/CreateView'
import DetailView from '@/views/DetailView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
import MainPageView from '@/views/MainPageView'
import ProfileView from '@/views/ProfileView'
import DetailDeposit from '@/components/DetailDeposit'
import DetailSaving from '@/components/DetailSaving'
import Statistics from '@/components/Statistics'
import ProfileDeposit from '@/components/ProfileDeposit'
import ProfileSaving from '@/components/ProfileSaving'


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
    path: '/detail-deposit/:id',
    name: 'DetailDeposit',
    component: DetailDeposit,
  },
  {
    path: '/detail-saving/:id',
    name: 'DetailSaving',
    component: DetailSaving,

  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView,
  },
  {
    path: '/profile/Statistics',
    name : 'Statistics',
    component : Statistics,
  },
  {
    path : '/profiledeposit',
    name : 'ProfileDeposit',
    component : ProfileDeposit,
  },
  {
    path : '/profilesaving',
    name : 'ProfileSaving',
    component : ProfileSaving,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
