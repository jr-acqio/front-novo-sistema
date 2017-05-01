// Requires
require('./bootstrap.js')
require('bootstrap-sass')
require('ladda')
// console.log(ladda)
// DataTable
require('datatables.net-bs')
require('datatables.net-buttons-bs')
require('datatables.net-buttons/js/buttons.colVis.js')
require('datatables.net-buttons/js/buttons.html5.js')
require('datatables.net-buttons/js/buttons.flash.js')
require('datatables.net-buttons/js/buttons.print.js')
require('datatables.net-colreorder')
require('datatables.net-responsive-bs')

var VueBreadcrumbs = require('vue2-breadcrumbs')
window.moment = require('moment')
moment.locale('pt_br')

// Imports
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

import Vue from 'vue'
import {
  HasError,
  HasError4,
  AlertError,
  AlertErrors,
  AlertSuccess
} from 'vform'
import axios from 'axios'
import VueEvents from 'vue-events'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Meta from 'vue-meta'
import store from './store'
import { sync } from 'vuex-router-sync'

import Multiselect from 'vue-multiselect'
// import VueSocketio from 'vue-socket.io'
import App from './App'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Logger from './plugins/Logger'
import Clients from './components/Passport/Clients'
import configureDataTables from './configureDataTables'

// Components Layouts
Vue.component('login-page', require('./pages/LoginPage'))
Vue.component('child', require('./components/Child'))
Vue.component('loading', require('./components/Loading'))
Vue.component('multiselect', Multiselect)
Vue.component('app', App)
Vue.component('clients', Clients)
Vue.component('sidebar-nav', require('./layouts/Sidebar-nav'))
Vue.component('vs-footer', require('./layouts/Footer'))
Vue.component('datatable', require('./components/Tables/Datatable'))
Vue.component('datatable-slot', require('./components/Tables/DataTableSlot'))
Vue.component('breadcrumb', require('./layouts/Breadcrumbs'))
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component(AlertErrors.name, AlertErrors)
Vue.component(AlertSuccess.name, AlertSuccess)
configureDataTables($)

// Installations
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Logger, {loggin: true})
Vue.use(Meta)
Vue.use(VueEvents)
Vue.use(VueBreadcrumbs)
Vue.use(ElementUI)
// Vue.use(VueSocketio, 'http://localhost:8890')
const routes = [
  { path: '/',
    component: require('./pages/LoginPage'),
    name: 'home'
  },
  // Dashboard
  { path: '/admin',
    component: require('./pages/admin/dashboard'),
    name: 'dashboard',
    meta: { requiresAuth: true, breadcrumb: {name: 'Home', icon: 'icon-home2 position-left'} },
    children: [
      {
        path: 'boletos/clientes',
        component: require('./pages/admin/boletos/clientes'),
        name: 'admin.boletos.clientes',
        meta: {
          requiresAuth: true, breadcrumb: { name: 'Boletos Cliente', icon: 'icon-barcode2' }
        }
      },
      {
        path: 'boletos/franchising',
        component: require('./pages/admin/boletos/franchising'),
        name: 'admin.boletos.franchising',
        meta: {
          requiresAuth: true, breadcrumb: { name: 'Boletos Franchising', icon: 'icon-barcode2' }
        }
      }
    ]
  },
  // Some others routes
  {path: '/forgot-password', component: ForgotPassword, name: 'forgot-password'},
  {path: '/reset-password/:token', component: ResetPassword, name: 'reset-password'},
  {path: '*',
    redirect: to => {
      window.history.back()
    }
  }
]

const router = new VueRouter({
  // mode: 'history',
  routes
})
sync(store, router)
router.beforeEach((to, from, next) => {
  // console.log(store.state.userStore.authUser)
  const authUser = JSON.parse(window.localStorage.getItem('authUser'))
  if (to.name === 'home' && JSON.parse(window.localStorage.getItem('authUser')) !== null) {
  // const authUser = store.state.userStore.authUser
  // if (to.name === 'home' && authUser !== null) {
    console.log('Logged')
    router.push('/admin')
    return false
  }
  if (to.meta.requiresAuth) {
    // const authUser = JSON.parse(window.localStorage.getItem('authUser'))
    if (authUser && authUser.token) {
      next()
    } else {
      console.log('Not logged')
      router.push({name: 'home'})
      return false
      // next({name: 'home'})
    }
  }
  next()
})

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.status === 401) {
      console.log('Need to login again')
    }
  })
})

var app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
