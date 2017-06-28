/**
* Components are lazy-loaded - See "Grouping Components in the Same Chunk"
* http://router.vuejs.org/en/advanced/lazy-loading.html
*/
/* eslint-disable global-require */
export const Boletos = r => require.ensure([], () => r(require('../pages/boletos')), 'analytics-bundle')
