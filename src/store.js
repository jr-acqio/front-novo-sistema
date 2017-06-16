import Vue from 'vue'
import Vuex from 'vuex'

import userStore from './stores/userStore'
import accessStore from './stores/accessStore'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    userStore, accessStore
  },
  strict: debug
})
