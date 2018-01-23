import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import Router from 'vue-router'
import pages from './pages'

import store from '../store'
import debug from 'debug'

let log = debug('router')

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: pages.home
    }
  ]
})

// keep router in sync with store
sync(store, router, { moduleName: 'route' })

log('Initialized Router')

export default router
