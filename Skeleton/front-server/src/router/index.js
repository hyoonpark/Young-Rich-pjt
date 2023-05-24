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
import KakaoView from '@/components/Map/KakaoMap'
import ExchangeView from '@/components/ExchangeCalculator'
import ArticleListView from '@/views/ArticleListView'
import ArticleDetailView from '@/views/ArticleDetailView'


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
    path: '/board',
    name: 'ArticleListView',
    component: ArticleListView,
  },

  {
    path: 'article/:id',
    name: 'ArticleDetailView',
    component: ArticleDetailView,
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
    path: '/map',
    name: 'KakaoView',
    component: KakaoView,
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
    path: '/profile/statistics',
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
  {
    path: '/exchange',
    name: 'ExchangeView',
    component: ExchangeView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
