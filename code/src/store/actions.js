import {
  $apis
} from '@helper'
// import getWeb3 from '../util/getWeb3'
// import getContract from '../util/getContract'

export default {
  async $gameConfigInfo({
    commit,
    state
  }) {
    // if (!state.userId) return
    let res = await $apis.user.gameconfig()
    console.log('res=====', res)
    commit('$gameconfig', res.data)
  },
  $vuexSetUserInfo({
    commit,
    state
  }, info) {
    commit('$vuexSetUserInfo', info)
  },
  $setToken({
    commit,
    state
  }, info) {
    commit('$set_token', info)
  },
  $setMenuList({
    commit,
    state
  }, menuList) {
    commit('$vuexSetMenuList', menuList)
  },

  $setLoginState({
    commit,
    state
  }, info) {
    commit('$isLogin', info)
  },
  $setMaskState({
    commit,
    state
  }, info) {
    commit('$noActivate', info)
  }
}
