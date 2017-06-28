import store from '../store'

const needAuth = auth => auth === true

const beforeEach = (to, from, next) => {
  const auth = to.meta.requiresAuth
  /**
   * If route doesn't require authentication be normally accessed.
   */
  if (!needAuth(auth)) {
    console.log("N precisa de authentication")
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
      next() // can access the route
    })
    .catch(() => {
      console.log("Redirect to Login")
      // No token, or it is invalid
      next({ name: 'home' }) // redirect to login
    })
}

export default beforeEach
