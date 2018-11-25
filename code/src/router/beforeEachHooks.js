/*
* 路由跳转权限控制
*/
import Vue from 'vue'
// import { $auth } from '@helper'
import store from '@store'

export default {
  // Check the login status
  checkLoginAuth (to, from, next) {
    if (to.meta.title && to.meta.title[Vue.config.lang]) {
      document.title = to.meta.title[Vue.config.lang]
    }

    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      if (store.state.token) {
        next()
      } else {
        store.commit('$isLogin', false)
      }
    }
  },

  // Check page permissions
  checkPageAuth (to, from, next) {
    if (to.meta && to.meta.ignoreAuth) {
      next()
    } else {
      // check user auth here....
      next()
    }
  }
}
