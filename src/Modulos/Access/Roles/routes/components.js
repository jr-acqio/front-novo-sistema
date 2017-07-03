/**
* Components are lazy-loaded - See "Grouping Components in the Same Chunk"
* http://router.vuejs.org/en/advanced/lazy-loading.html
*/
/* eslint-disable global-require */
export const Home = r => require.ensure([], () => r(require('../pages/index')), 'role-bundle')
export const Edit = r => require.ensure([], () => r(require('../pages/edit')), 'role-bundle')
