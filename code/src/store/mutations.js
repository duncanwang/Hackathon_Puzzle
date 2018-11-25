// import {STORAGE_KEY} from '@constants/index'
import { $utils } from '@helper'

export default {
  $vuexSetUserInfo (state, info) {
    state.userId = info.useid
    $utils.setStorage('useid', info.useid)
    state.mobile = info.mobile
    $utils.setStorage('mobile', info.mobile)
  },
  $gameconfig (state, info) {
    state.gameconfig = info
  },
  $setToken (state, token) {
    state.token = token
    $utils.setStorage('Token', token)
  },
  $setdealId (state, info) {
    state.dealId = info
  },
  $showLoading(state) {
    state.LOADING = true
  },
  $hideLoading(state) {
    state.LOADING = false
  },
  $delInfo (state) {
    state.token = ''
    $utils.removeStorage('Token')
    state.userId = ''
    $utils.removeStorage('useid')
    state.mobile = ''
    $utils.removeStorage('moblie')
  },
  $isLogin (state, info) {
    state.islogin = info
  },
  $noActivate (state, info) {
    state.noActivate = info
  }
}
