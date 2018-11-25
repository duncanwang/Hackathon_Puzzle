import Frame from '@views/partials/Frame'
import { $utils } from '@helper'

export default [{
  path: '/page',
  component: Frame,
  fullpath: 'page',
  // isHideInMenu: true,
  meta: {
    title: $utils.titleLang('模块', 'Demo Moudle')
  },
  children: [
    {
      path: 'mine',
      fullpath: '/page/mine',
      // isHideInMenu: false,
      meta: {
        title: $utils.titleLang('PUZZLEBID', 'PUZZLEBID'),
        ignoreAuth: false
        // ignoreAuth: true
      },
      component: resolve => require(['@views/page/Mine'], resolve)
    },
    {
      path: 'deal',
      fullpath: '/page/deal',
      meta: {
        title: $utils.titleLang('PUZZLEBID', 'PUZZLEBID'),
        ignoreAuth: true
      },
      component: resolve => require(['@views/page/Deal'], resolve)
    }
  ]
}]
