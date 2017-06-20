import { ForgotPassword, LoginPage, ResetPassword } from './components'

// const children = [{
//   name: 'auth.signin',
//   path: 'signin',
//   component: LoginPage,
//   meta: { requiresAuth: false }
// }]

export default [{
  // children,
  name: 'auth.signin',
  path: '/auth/signin',
  component: LoginPage,
  redirect: { name: 'auth.signin' },
  meta: { requiresAuth: false }
}]
