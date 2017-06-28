import { Boletos } from './components'

// const children = [{
//   name: 'auth.signin',
//   path: 'signin',
//   component: LoginPage,
//   meta: { requiresAuth: false }
// }]

export default [
  {
    // children,
    name: 'analytics.boletos',
    path: '/analytics/boletos',
    component: Boletos,
    meta: {
      requiresAuth: true, breadcrumb: { name: 'Analytics Boleto', icon: '' }
    }
  }
]
