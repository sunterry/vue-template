import {Login} from '@http'
import {SUCCESS_SERVER} from '@http/http.code'
import {USERLOGIN} from '@store/types'
export default {
  state: {
    token: ''
  },
  actions: {
    login: async ({commit}, data) => {
      let res = await Login(data)
      if (res.code === SUCCESS_SERVER) {
        let {data} = res
        commit(USERLOGIN, {data})
      }
    }
  },
  mutations: {
    [USERLOGIN] (state, params) {
      state.token = params.token
    }
  }
}
