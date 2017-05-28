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
import Auth from './packages/auth/Auth'
Vue.use(Auth)
import {
  HasError,
  HasError4,
  AlertError,
  // AlertErrors,
  AlertSuccess
} from 'vform'
import axios from 'axios'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
import VueEvents from 'vue-events'
import VueRouter from 'vue-router'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
// import VueResource from 'vue-resource'
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
Vue.component('dashboard', require('./pages/admin/dashboard'))
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
// Vue.component(AlertErrors.name, AlertErrors)
Vue.component('alert-errors', require('./components/VForm/Errors'))
Vue.component(AlertSuccess.name, AlertSuccess)
configureDataTables($)

// Installations
Vue.use(VueRouter)
// Vue.use(VueResource)
Vue.use(Logger, {loggin: true})
Vue.use(Meta)
Vue.use(VueEvents)
Vue.use(VueBreadcrumbs)
Vue.use(ElementUI)
// Vue.use(VueSocketio, 'http://localhost:8890')
const routes = [
  { path: '/',
    component: require('./pages/LoginPage'),
    name: 'home',
    meta: { forVisitors: true }
  },
  // Dashboard
  { path: '/home',
    component: require('./pages/admin/dashboard'),
    name: 'dashboard',
    meta: { forAuth: true, breadcrumb: {name: 'Home', icon: 'icon-home2 position-left'} },
    children: [
      {
        path: '/users',
        component: require('./Modulos/Usuario/pages/index'),
        name: 'users',
        meta: { forAuth: true, breadcrumb: { name: 'Usuários', icon: '' } },
        children: [
          {
            path: 'create',
            component: require('./Modulos/Usuario/pages/create'),
            name: 'users.create',
            meta: { forAuth: true, breadcrumb: { name: 'Novo Usuário', icon: 'icon-user-plus' } }
          }
        ]
      },
      {
        path: '/boletos/clientes',
        component: require('./pages/admin/boletos/clientes'),
        name: 'boletos.clientes',
        meta: { forAuth: true, breadcrumb: { name: 'Boletos Cliente', icon: 'icon-barcode2' } }
      },
      {
        path: '/boletos/franchising',
        component: require('./pages/admin/boletos/franchising'),
        name: 'boletos.franchising',
        meta: {
          forAuth: true, breadcrumb: { name: 'Boletos Franchising', icon: 'icon-barcode2' }
        }
      },
      {
        path: '/boletos/conciliation',
        component: require('./Modulos/Boletos/pages/conciliation'),
        name: 'boletos.conciliation',
        meta: {
          forAuth: true, breadcrumb: { name: 'Conciliação', icon: 'icon-barcode2' }
        }
      },
      {
        path: '/security/profile',
        component: require('./Modulos/Usuario/pages/profile'),
        name: 'security.profile',
        meta: {
          forAuth: true, breadcrumb: { name: 'Meu Perfil', icon: '' }
        }
      },
      {
        path: '/analytics/boletos',
        component: require('./Modulos/Analytics/pages/boletos'),
        name: 'analytics.boletos',
        meta: {
          forAuth: true, breadcrumb: { name: 'Analytics Boleto', icon: '' }
        }
      }
    ]
  },
  // Some others routes
  { path: '/forgot-password',
    component: ForgotPassword,
    name: 'forgot-password',
    meta: { forVisitors: true }
  },
  {
    path: '/reset-password/:token',
    component: ResetPassword,
    name: 'reset-password',
    meta: { forVisitors: true }
  },
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
  // console.log('Autenticado ?', Vue.auth.isAuthenticated())
  if (to.matched.some(record => record.meta.forVisitors)) {
    if (Vue.auth.isAuthenticated()) {
      next({ name: 'dashboard' })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.forAuth)) {
    if (!Vue.auth.isAuthenticated() || !localStorage.getItem('authUser')) {
      Vue.auth.destroyToken()
      next({ name: 'home' })
    } else {
      next()
    }
  }
})

var app = new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    console.log('Need to login again')
    app.$root.$children[0].isAuth = false
    Vue.auth.destroyToken()
    router.push({name: 'home'})
    app.$root.$notify({
      title: 'Acesso Negado!',
      message: 'Para ter acesso realize seu login',
      type: 'error',
      duration: 5000
    })
  }
  return Promise.reject(error)
})
