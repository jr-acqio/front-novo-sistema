// index
export const KissFlowIndex = r => require.ensure([], () => r(require('../pages/index')), 'app-kf-bundle')
// Lançar valores no admin
export const App1 = r => require.ensure([], () => r(require('../pages/kf-lancarValoresAdmin')), 'app-kf-bundle')
// Liberação de pagamento para valores inferiores a R$ 200
export const App2 = r => require.ensure([], () => r(require('../pages/kf-PagamentoInferiorDuzentos')), 'app-kf-bundle')
