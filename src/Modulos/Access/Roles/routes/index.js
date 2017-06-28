import { Home } from './components'

// const children = [{
//   name: 'auth.signin',
//   path: 'signin',
//   component: LoginPage,
//   meta: { requiresAuth: false }
// }]

export default [
  {
    // children,
    name: 'role',
    path: '/roles',
    component: Home,
    meta: { requiresAuth: true }
  }
]
