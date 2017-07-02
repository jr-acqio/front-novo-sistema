// plugins is a alias. see client/build/webpack.base.conf.js
// import http client
import { http } from 'plugins/http'
import { getData } from 'utils/get'
import { loginUrl, meURL, roleUrl } from '../../../services/config'
// send login data and retrive a new token
export const postLogin = ({ email, password }) =>
  http.post(loginUrl, { email, password })
  /**
   * functional approach, more readable and generate minus code
   * examples:
   * PromiseObject.then(response => response.data)
   * PromiseObject.then({ data } => data)
   *
   * We do this many times in many locations.
   * We know that .then accepts a function and what arguments it receives
   * This is because in JavaScript functions are first class citizens.
   * In summary we can pass functions as arguments and also receive functions as results
   * (first-class function and higher-order function)
   */
 .then(getData) // .then(response => getData(response))

// get current user's data
export const loadUserData = () => http.get(meURL).then(getData, console.log("Recarreguei o usuario"))

// get Roles and Permissions for save in vuex data
export const loadRoleAndPermissions = () => http.get(roleUrl).then(getData, console.log("Carregando as Roles"))

// revoke current token
export const revokeToken = () => http.post('/auth/token/revoke').then(getData)
