import { sync } from 'vuex-router-sync'
import Vue from 'vue'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import App from './App'

require('./includes')
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

var app = new Vue({
  el: '#app',
  router,
  store,
  // template: '<App/>',
  // components: { App }
  render: h => h(App),
})

// axios.interceptors.response.use(function (response) {
//   return response
// }, function (error) {
//   if (error.response.status === 401) {
//     console.log('Need to login again')
//     app.$root.$children[0].isAuth = false
//     Vue.auth.destroyToken()
//     router.push({name: 'home'})
//     app.$root.$notify({
//       title: 'Acesso Negado!',
//       message: 'Para ter acesso realize seu login',
//       type: 'error',
//       duration: 5000
//     })
//   }
//   return Promise.reject(error)
// })
