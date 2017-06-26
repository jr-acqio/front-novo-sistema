import { Cliente, Conciliation, Franchising, HomeBoleto } from './components'

const children = [
  {
    path: '/boletos/clientes',
    component: Cliente,
    name: 'boletos.clientes',
    meta: { requiresAuth: true, breadcrumb: { name: 'Boletos Cliente', icon: 'icon-barcode2' } }
  },
  {
    path: '/boletos/franchising',
    component: Franchising,
    name: 'boletos.franchising',
    meta: {
      requiresAuth: true, breadcrumb: { name: 'Boletos Franchising', icon: 'icon-barcode2' }
    }
  },
  {
    path: '/boletos/conciliation',
    component: Conciliation,
    name: 'boletos.conciliation',
    meta: {
      requiresAuth: true, breadcrumb: { name: 'Conciliação', icon: 'icon-barcode2' }
    }
  }
]

export default [
  {
    children,
    name: 'boleto.index',
    path: '/boletos',
    component: HomeBoleto,
    redirect: { name: 'auth.signin' },
    meta: { requiresAuth: true, breadcrumb: { name: 'Boletos', icon: '' } }
  }
]
