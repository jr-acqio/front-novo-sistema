import { ForgotPassword, LoginPage, ResetPassword } from './components'

// const children = [{
//   name: 'auth.signin',
//   path: 'signin',
//   component: LoginPage,
//   meta: { requiresAuth: false }
// }]

export default [
  {
    // children,
    name: 'auth.signin',
    path: '/',
    component: LoginPage,
    // redirect: { name: 'auth.signin' },
    meta: { requiresAuth: false }
  },
  { path: '/forgot-password',
      component: ForgotPassword,
      name: 'forgot-password',
      meta: { forVisitors: true }
    },
    {
      path: '/reset-password/:token',
      component: ResetPassword,
      name: 'reset-password',
      meta: { forVisitors: true }
    }
]
