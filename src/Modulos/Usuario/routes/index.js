import { Create, Edit, Home, Profile } from './components'

const children = [
  {
    path: '/users/create',
    component: Create,
    name: 'user.create',
    meta: { requiresAuth: true, breadcrumb: { name: 'Criar Usuário', icon: 'icon-user' } }
  }
]

export default [
  {
    children,
    name: 'user.index',
    path: '/users',
    component: Home,
    meta: { requiresAuth: true, breadcrumb: { name: 'Usuários', icon: '' } }
  }
]