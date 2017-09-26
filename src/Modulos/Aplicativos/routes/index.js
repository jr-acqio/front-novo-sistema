import { KissFlowIndex, App1, App2 } from './components'

const children = [
  {
    path: 'lancar-valores-admin',
    component: App1,
    name: 'app.kf.lancar-valores-admin',
    meta: { requiresAuth: true, breadcrumb: { name: 'Lançar valores no admin', icon: '' } }
  },
  {
    path: 'liberar-pagamento',
    component: App2,
    name: 'app.kf.liberacao-pagamento',
    meta: { requiresAuth: true, breadcrumb: { name: 'Liberação de pagamento', icon: '' } }
  }
]

export default [
  {
    children,
    name: 'app.kf.index',
    path: '/aplicativos',
    component: KissFlowIndex,
    meta: { requiresAuth: true, breadcrumb: { name: 'Aplicativos KissFlow', icon: '' } }
  }
]
