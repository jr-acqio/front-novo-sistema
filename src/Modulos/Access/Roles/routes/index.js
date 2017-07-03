import { Home, Edit } from './components'

const children = [{
  name: 'role.edit',
  path: 'edit/:id',
  component: Edit,
  meta: { requiresAuth: true, requireRole: ['admin'] }
}]

export default [
  {
    children,
    name: 'role.index',
    path: '/roles',
    component: Home,
    meta: { requiresAuth: true, requireRole: ['admin'], breadcrumb: { name: 'Grupos', icon: '' } }
  }
]
