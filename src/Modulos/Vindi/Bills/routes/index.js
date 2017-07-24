import { Home } from './components'

const children = [
  // {
  //   path: 'subscriptions',
  //   component: Create,
  //   name: 'user.create',
  //   meta: { requiresAuth: true, breadcrumb: { name: 'Criar Usuário', icon: 'icon-user' } }
  // }
]

export default [
  {
    // children,
    name: 'vindi.bills',
    path: 'bills',
    component: Home,
    meta: { requiresAuth: true, requireRole: ['financeiro'], breadcrumb: { name: 'Faturas', icon: '' } }
  }
]
