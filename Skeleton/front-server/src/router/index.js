import Vue from 'vue'
import VueRouter from 'vue-router'
import CompareView from '@/views/CompareView'
import CreateView from '@/views/CreateView'
import DetailView from '@/views/DetailView'
import SignUpView from '@/views/SignUpView'
import LogInView from '@/views/LogInView'
<<<<<<< HEAD
import MainPageView from '@/views/MainPageView'
import ArticleView from '@/views/ArticleView'
import DetailDeposit from '@/components/DetailDeposit'
import DetailSaving from '@/components/DetailSaving'
=======
import CalculatorView from '@/views/CalculatorView'
import MainPageView from '@/views/MainPageView'
>>>>>>> main


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainPageView',
    component: MainPageView
<<<<<<< HEAD
  },
 
  {
    path: '/',
    name: 'ArticleView',
    component: ArticleView
=======
>>>>>>> main
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
    path: '/calculator',
    name: 'CalculatorView',
    component: CalculatorView
  },

  {
    path : '/rate-comparison',
    name : 'CompareView',
    component : CompareView,
<<<<<<< HEAD
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
=======
  }
>>>>>>> main
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
