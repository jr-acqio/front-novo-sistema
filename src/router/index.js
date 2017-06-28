import Vue from 'vue'
import Router from 'vue-router'
import beforeEach from './beforeEach'
import { routes as app } from '../Modulos'

Vue.use(Router)
const NotFound = {
  path: '*',
  redirect: to => {
    console.log("ROTA N EXISTE", to)
    window.history.back()
  }
}
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Spread_operator
const routes = [...app]
console.log(routes)

const router = new Router({
  routes,
  linkActiveClass: 'active'
  // mode: 'history', // do not use /#/.
})
/**
* Before a route is resolved we check for
* the token if the route is marked as
* requireAuth.
*/
router.beforeEach(beforeEach)

export default router

// const routes = [
//   { path: '/',
//     component: require('./pages/LoginPage'),
//     name: 'home',
//     meta: { forVisitors: true }
//   },
//   // Dashboard
//   { path: '/home',
//     component: require('./pages/admin/dashboard'),
//     name: 'dashboard',
//     meta: { forAuth: true, breadcrumb: {name: 'Home', icon: 'icon-home2 position-left'} },
//     children: [
//       {
//         path: '/users',
//         component: require('./Modulos/Usuario/pages/index'),
//         name: 'users',
//         meta: { forAuth: true, breadcrumb: { name: 'Usuários', icon: '' } },
//         children: [
//           {
//             path: 'create',
//             component: require('./Modulos/Usuario/pages/create'),
//             name: 'users.create',
//             meta: { forAuth: true, breadcrumb: { name: 'Novo Usuário', icon: 'icon-user-plus' } }
//           }
//         ]
//       },
//       {
//         path: '/boletos',
//         component: require('./Modulos/Boletos/pages/index'),
//         name: 'boletos',
//         meta: { forAuth: true, breadcrumb: { name: 'Boletos', icon: '' } },
//         children: [
//           {
//             path: '/boletos/clientes',
//             component: require('./Modulos/Boletos/pages/clientes'),
//             name: 'boletos.clientes',
//             meta: { forAuth: true, breadcrumb: { name: 'Boletos Cliente', icon: 'icon-barcode2' } }
//           },
//           {
//             path: '/boletos/franchising',
//             component: require('./Modulos/Boletos/pages/franchising'),
//             name: 'boletos.franchising',
//             meta: {
//               forAuth: true, breadcrumb: { name: 'Boletos Franchising', icon: 'icon-barcode2' }
//             }
//           },
//           {
//             path: '/boletos/conciliation',
//             component: require('./Modulos/Boletos/pages/conciliation'),
//             name: 'boletos.conciliation',
//             meta: {
//               forAuth: true, breadcrumb: { name: 'Conciliação', icon: 'icon-barcode2' }
//             }
//           }
//         ]
//       },
//       {
//         path: '/permissions',
//         component: require('./Modulos/Access/Permissions/pages/index'),
//         name: 'permission',
//         meta: {
//           forAuth: true, breadcrumb: { name: 'Permissões', icon: '' }
//         }
//       },
//       {
//         path: '/roles',
//         component: require('./Modulos/Access/Roles/pages/index'),
//         name: 'roles',
//         meta: {
//           forAuth: true, breadcrumb: { name: 'Grupos', icon: '' }
//         }
//       },
//       {
//         path: '/security/profile',
//         component: require('./Modulos/Usuario/pages/profile'),
//         name: 'security.profile',
//         meta: {
//           forAuth: true, breadcrumb: { name: 'Meu Perfil', icon: '' }
//         }
//       },
//       {
//         path: '/analytics/boletos',
//         component: require('./Modulos/Analytics/pages/boletos'),
//         name: 'analytics.boletos',
//         meta: {
//           forAuth: true, breadcrumb: { name: 'Analytics Boleto', icon: '' }
//         }
//       }
//     ]
//   },
//   // Some others routes
//   { path: '/forgot-password',
//     component: ForgotPassword,
//     name: 'forgot-password',
//     meta: { forVisitors: true }
//   },
//   {
//     path: '/reset-password/:token',
//     component: ResetPassword,
//     name: 'reset-password',
//     meta: { forVisitors: true }
//   },
//   {path: '*',
//     redirect: to => {
//       window.history.back()
//     }
//   }
// ]
//
// const router = new VueRouter({
//   // mode: 'history',
//   routes
// })
// sync(store, router)
// router.beforeEach((to, from, next) => {
//   // console.log('Autenticado ?', Vue.auth.isAuthenticated())
//   if (to.matched.some(record => record.meta.forVisitors)) {
//     if (Vue.auth.isAuthenticated()) {
//       next({ name: 'dashboard' })
//     } else {
//       next()
//     }
//   } else if (to.matched.some(record => record.meta.forAuth)) {
//     if (!Vue.auth.isAuthenticated() || !localStorage.getItem('authUser')) {
//       Vue.auth.destroyToken()
//       next({ name: 'home' })
//     } else {
//       next()
//     }
//   }
// })
