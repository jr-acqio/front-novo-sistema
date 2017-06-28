import localforage from 'localforage'
// src is a alias. see client/build/webpack.base.conf.js
import { userTokenStorageKey } from 'src/config'
import { isEmpty } from 'lodash'
import * as TYPES from './mutations-types'
import * as services from '../services'

export const attemptLogin = ({ dispatch }, payload) =>
    services.postLogin(payload)
    .then(({ token, user }) => {
      dispatch('setUser', user)
      dispatch('setToken', token)
      return user // keep promise chain
    })

export const logout = ({ dispatch }) => {
  // services.revokeToken()
  // call actions
  return Promise.all([
    dispatch('setToken', null),
    dispatch('setUser', {})
  ])
}

export const setUser = ({ commit }, user) => {
  // Commit the mutations
  console.log("SET USER", user)
  commit(TYPES.SET_USER, user)

  Promise.resolve(user) // keep promise chain
}

export const setToken = ({ commit }, payload) => {
  // prevent if payload is a object
  const token = (isEmpty(payload)) ? null : payload.token || payload

  // Commit the mutations
  commit(TYPES.SET_TOKEN, token)

  return Promise.resolve(token) // keep promise chain
}

export const checkUserToken = ({ dispatch, state }) => {
  // If the token exists then all validation has already been done
  console.log("Estou dentro do CheckUserToken", !isEmpty(state.token), state)
  if (!isEmpty(state.token)) {
    console.log("State ", state)
    // if (!isEmpty(state.user)) {
    // }
    return Promise.resolve(state.token)
    // console.log("Voce deu reload na pagina vou recarregar o usuario no vuex")
    // dispatch('loadUser')
  }
  /**
   * Token does not exist yet
   * - Recover it from localstorage
   * - Recover also the user, validating the token also
   */
  return localforage.getItem(userTokenStorageKey)
    .then((token) => {
      if (isEmpty(token)) {
        // Token is not saved in localstorage
        return Promise.reject('NO_TOKEN') // Reject promise
      }
      // Put the token in the vuex store
      return dispatch('setToken', token) // keep promise chain
    })
    // With the token in hand, retrieves the user's data, validating the token
    .then(() => dispatch('loadUser'))
}

/**
 * Retrieves updated user information
 * If something goes wrong, the user's token is probably invalid
 */
export const loadUser = ({ dispatch }) => services.loadUserData()
  // store user's data
  .then(user => dispatch('setUser', user))
  .catch(() => {
    // Process failure, delete the token
    dispatch('setToken', '')
    return Promise.reject('FAIL_IN_LOAD_USER') // keep promise chain
  })
