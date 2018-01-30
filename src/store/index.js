import Vue from 'vue'
import Vuex from 'vuex'
import user from '@store/user'
import getters from '@store/getters'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    user
  },
  getters
})
export default store
