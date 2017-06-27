/**
* Components are lazy-loaded - See "Grouping Components in the Same Chunk"
* http://router.vuejs.org/en/advanced/lazy-loading.html
*/
/* eslint-disable global-require */
export const Perms = r => require.ensure([], () => r(require('../pages/index')), 'perms-bundle')

// export const LoginPage = require('../components/LoginPage')
// export const ForgotPassword = require('../components/ForgotPassword')
// export const ResetPassword = require('../components/ResetPassword')
