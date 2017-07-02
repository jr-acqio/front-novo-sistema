import store from '../store'
import router from './index'
import { isString, isArray } from 'lodash'

const needAuth = auth => auth === true
const needRole = role => isString(role) || isArray(role) // role !== '' && role !== 'undefined'

const beforeEach = (to, from, next) => {
  const auth = to.meta.requiresAuth
  const role = to.meta.requireRole
  const permission = to.meta.requirePermission
  /**
   * If route doesn't require authentication be normally accessed.
   */
  if (!needAuth(auth)) {
    // console.log("N precisa de authentication")
    next()
    return // return to prevent the code from continuing in its flow
    // With this flow `else` or `else if` is not necessary
  }
  /**
   * Otherwise  if authentication is required login.
   */
  store.dispatch('checkUserToken')
    .then(() => {
      console.log("Token is Valid")
      // There is a token and it is valid
      // next() // can access the route
      // Check Niveis de Acesso estão carregados
      store.dispatch('checkRoles')
        .then(() => {
          console.log("RequireRole: ", role, needRole(role))
          if (needRole(role)) {
              console.log('ARRAY')
              !router.app.$acl.hasRole(role, true) ? router.push({ name: 'home' }) : console.log("Vc tem permissão")
          }
          console.log("Merda passou direto")
          next()
        })
        .catch((error) => {
          console.log("Não foi possível carregar os niveis", error)
          next({ name: 'auth.signin' }) // redirect to login
        })
    })
    .catch(() => {
      console.log("Redirect to Login")
      // No token, or it is invalid
      next({ name: 'auth.signin' }) // redirect to login
    })
}

export default beforeEach
