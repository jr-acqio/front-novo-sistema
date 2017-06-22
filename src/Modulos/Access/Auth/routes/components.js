/**
* Components are lazy-loaded - See "Grouping Components in the Same Chunk"
* http://router.vuejs.org/en/advanced/lazy-loading.html
*/
/* eslint-disable global-require */
export const LoginPage = r => require.ensure([], () => r(require('../components/LoginPage')), 'auth-bundle')
export const ForgotPassword = r => require.ensure([], () => r(require('../components/ForgotPassword')), 'auth-bundle')
export const ResetPassword = r => require.ensure([], () => r(require('../components/ResetPassword')), 'auth-bundle')

// export const LoginPage = require('../components/LoginPage')
// export const ForgotPassword = require('../components/ForgotPassword')
// export const ResetPassword = require('../components/ResetPassword')
