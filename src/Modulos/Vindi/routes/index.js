const DashVindi = r => require.ensure([], () => r(require('../dashvindi')), 'vindi-bundle')

import { routes as subscriptions } from '../Subscriptions'

export default [
  {
      children: [...subscriptions],
      name: 'vindi',
      path: '/vindi',
      component: DashVindi,
      meta: { requiresAuth: true, requireRole: ['admin'], breadcrumb: { name: 'Vindi', icon: '' } }
  }
]
