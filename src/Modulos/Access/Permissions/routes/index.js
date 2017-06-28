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
    // redirect: { name: 'auth.signin' },
    meta: { requiresAuth: true, breadcrumb: { name: 'Permissões', icon: 'icon-key' } }
  }
]
