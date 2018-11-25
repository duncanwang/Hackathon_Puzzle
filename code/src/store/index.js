import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)

const state = {
  dealId: '',
  token: '',
  userId: '',
  userInfo: null,
  mobile: '',
  menuList: [],
  islogin: true,
  noActivate: true,
  LOADING: false,
  gameconfig: null
}

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
  strict: debug,
  plugins: debug ? [createLogger()] : []
})
