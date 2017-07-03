import { Perms } from './components'

// const children = [{
//   name: 'auth.signin',
//   path: 'signin',
//   component: LoginPage,
//   meta: { requiresAuth: false }
// }]

export default [
  {
    // children,
    name: 'permissions',
    path: '/permissions',
    component: Perms,
    meta: { requiresAuth: true, requireRole: ['admin'], breadcrumb: { name: 'Permissões', icon: 'icon-key' } }
  }
]
