import { Cliente, Conciliation, Franchising, HomeBoleto, BoletoSimples } from './components'

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
  },
  {
    path: '/boletos/boleto-simples',
    component: BoletoSimples,
    name: 'boletos.boleto-simples',
    meta: {
      requiresAuth: true, breadcrumb: { name: 'Boleto Simples', icon: 'icon-barcode2' }
    }
  }
]

export default [
  {
    children,
    name: 'boleto.index',
    path: '/boletos',
    component: HomeBoleto,
    meta: { requiresAuth: true, breadcrumb: { name: 'Boletos', icon: '' } }
  }
]
