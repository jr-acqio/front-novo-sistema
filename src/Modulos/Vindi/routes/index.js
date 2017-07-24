const DashVindi = r => require.ensure([], () => r(require('../dashvindi')), 'vindi-bundle')

import { routes as subscriptions } from '../Subscriptions'
import { routes as bills } from '../Bills'

export default [
  {
      children: [...subscriptions, ...bills],
      name: 'vindi',
      path: '/vindi',
      component: DashVindi,
      meta: { requiresAuth: true, requireRole: ['admin'], breadcrumb: { name: 'Vindi', icon: '' } }
  }
]
