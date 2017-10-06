import { sync } from 'vuex-router-sync'
import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'

import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'

// configure language
locale.use(lang)

require('./includes')

import VueProgressBar from 'vue-progressbar'

Vue.use(VueProgressBar, {
  color: 'rgb(143, 255, 199)',
  failedColor: 'red',
  height: '2px'
})

/**
* This is the Vuex store and it is
* avaible to all your components
*/
import store from './store'

/**
* This is the Router
*/
import router from './router'

/**
* $http plugin based on axios
*/
import httpPlugin from './plugins/http'

/**
* eventbus plugin
*/
import eventbus from './plugins/eventbus'

/**
* Import Vue Mask
*/
import VueTheMask from 'vue-the-mask'

Vue.use(VueTheMask)

import money from 'v-money'

// register directive v-money and component <money>
Vue.use(money, {precision: 2, prefix: 'R$ ', decimal: ',', thousands: '.'})

/**
* Make $bus avaible to all components
*/
Vue.use(eventbus)

/**
* Make $http avaible to all components
* Send store and router to httpPlugin (injection)
*/
Vue.use(httpPlugin, { store, router })

// Effortlessly keep vue-router and vuex store in sync.
sync(store, router) // https://github.com/vuejs/vuex-router-sync/tree/next

var VueBreadcrumbs = require('vue2-breadcrumbs')
import Acl from './packages/access/ACL'
Vue.use(Acl, { store })
import {
  HasError,
  HasError4,
  AlertError,
  // AlertErrors,
  AlertSuccess
} from 'vform'
// import axios from 'axios'
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token')
// import VueEvents from 'vue-events'
// import VueRouter from 'vue-router'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios, axios)
// import VueResource from 'vue-resource'
import Meta from 'vue-meta'

import Multiselect from 'vue-multiselect'
// import VueSocketio from 'vue-socket.io'
// import ForgotPassword from './pages/ForgotPassword'
// import ResetPassword from './pages/ResetPassword'
import Logger from './plugins/Logger'
// import Clients from './components/Passport/Clients'
import configureDataTables from './configureDataTables'

// Components Layouts
Vue.component('child', require('./components/Child'))
Vue.component('loading', require('./components/Loading'))
Vue.component('multiselect', Multiselect)
Vue.component('app', App)
// Vue.component('clients', Clients)
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
// Vue.use(VueRouter)
// Vue.use(VueResource)
Vue.use(Logger, {loggin: true})
Vue.use(Meta)
// Vue.use(VueEvents)
Vue.use(VueBreadcrumbs)
Vue.use(ElementUI)
// Vue.use(VueSocketio, 'http://localhost:8890')

import { myMixin } from 'mixins/mixins'
var app = new Vue({
  el: '#app',
  router,
  store,
  // template: '<App/>',
  render: h => h(App),
})
