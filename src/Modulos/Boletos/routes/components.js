export const Cliente = r => require.ensure([], () => r(require('../pages/clientes')), 'boleto-bundle')
export const Conciliation = r => require.ensure([], () => r(require('../pages/conciliation')), 'boleto-bundle')
export const Franchising = r => require.ensure([], () => r(require('../pages/franchising')), 'boleto-bundle')
export const HomeBoleto = r => require.ensure([], () => r(require('../pages/index')), 'boleto-bundle')