// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@router'
import store from '@store'
import * as filters from '@filter'
import * as directive from '@directive'
Vue.config.productionTip = false

Object.keys(filters).forEach(k => Vue.filter(k, filters[k]))
Object.keys(directive).forEach(k => Vue.directive(k, directive[k]))

router.beforeEach((to, from, next) => {
  let token = store.state.token || window.localStorage.getItem('token')
  if (to.meta.auth) {
    if (token) {
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
