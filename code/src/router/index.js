import Vue from 'vue'
import Router from 'vue-router'
import beforeEachHooks from './beforeEachHooks'
import RoutesMapConfig from './routes'
import commonRoutesMap from './commonRoutes'
import { routerMode } from '../helper/env'
import store from '@store'
import { $utils } from '@helper'

Vue.use(Router)


if ($utils.getStorage('Token')) {
  // console.log('token', $utils.getStorage('Token'))
  store.commit('$setToken', $utils.getStorage('Token'))
}
const routerInstance = new Router({
  mode: routerMode,
  /*
    @desc: base,应用的基路径;如整个单页应用服务在 /app/ 下，base 就应该设为 "/app/";
  */
  base: '/',
  linkActiveClass: 'active',
  scrollBehavior: () => ({ y: 0 }),
  routes: RoutesMapConfig.concat(commonRoutesMap)
})

Object.values(beforeEachHooks).forEach((hook) => {
  routerInstance.beforeEach(hook)
})

export default routerInstance
