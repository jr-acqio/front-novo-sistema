import Vue from 'vue'
import { http } from 'plugins/http'
import {
  getHeader,
  roleUrl
} from '../services/config'
const state = {
  access: []
}

const mutations = {
  SET_ACCESS_LIST (state, access) {
    state.access = access
  }
}

const actions = {
  getAccessList: ({commit}) => {
    return http.get(roleUrl, {headers: getHeader()})
      .then(response => {
        if (response.status === 200) {
          // console.log(response.data)
          commit('SET_ACCESS_LIST', response.data)
          window.localStorage.setItem('niveis', JSON.stringify(response.data))
          return response.data
        }
      })
  }
}

export default {
  state, mutations, actions
}
