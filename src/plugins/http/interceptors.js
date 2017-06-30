import { isArray } from 'lodash'

export default (http, store, router) => {
  // https://github.com/mzabriskie/axios#interceptors
  http.interceptors.response.use(
    response => response,
    /**
    * This is a central point to handle all
    * error messages generated by HTTP
    * requests
    */
    (error) => {
      const { response } = error
      /**
      * If token is either expired, not provided or invalid
      * then redirect to login. On server side the error
      * messages can be changed on app/Providers/EventServiceProvider.php
      */
      if ([401, 400].indexOf(response.status) > -1) {
        store.dispatch('logout')
        router.push({ name: 'auth.signin' })
      }

      return Promise.reject(error)
    }
  )
}
