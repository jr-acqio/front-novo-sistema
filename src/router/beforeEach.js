import store from '../store'
import router from './index'
import { isString, isArray } from 'lodash'

const needAuth = auth => auth === true
const needRole = role => isString(role) || isArray(role) // role !== '' && role !== 'undefined'
const needPerm = perm => isString(perm) || isArray(perm)

const beforeEach = (to, from, next) => {
  const auth = to.meta.requiresAuth
  const role = to.meta.requireRole
  const perm = to.meta.requirePerm
  /**
  * If route doesn't require authentication be normally accessed.
  */
  if (!needAuth(auth)) {
    next()
    return // return to prevent the code from continuing in its flow
    // With this flow `else` or `else if` is not necessary
  }
  /**
  * Otherwise  if authentication is required login.
  */
  store.dispatch('checkUserToken')
  .then(() => {
    // There is a token and it is valid
    if (needRole(role)) {
      if (!router.app.$acl.hasRole(role, true)) {
        sweetAlert("Oops...", "Acesso Negado!", "error")
        return window.history.back()
      }
    } else if (needPerm(perm)) {
      if (!router.app.$acl.can(perm, true)) {
        sweetAlert("Oops...", "Acesso Negado!", "error")
        return window.history.back()
      }
    }
    next() // can access the route
  })
  .catch((error) => {
    console.log("Redirect to Login", error)
    // No token, or it is invalid
    next({ name: 'auth.signin' }) // redirect to login
  })
}

export default beforeEach
