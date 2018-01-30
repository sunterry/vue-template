import axios from 'axios'
import {HTTP_OVERTIME, SUCCESS} from '@http/http.code'
export const baseURL = process.env.NODE_ENV === 'production' ? 'http://192.168.1.133:917/admin' : '/api'
/*
*   校验签名
*   import md5 from 'md5'
*   import ksort from 'phpksort'
*
*   axios.interceptors.requeset
*        let ajaxData = JSON.stringify(ksort(config.data))
*        config.data = Object.assign({}, config.data, {sign: md5(ajaxData)})
*
* */
export const Raxios = axios.create({
  baseURL,
  timeout: HTTP_OVERTIME,
  responseType: 'json',
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})
Raxios.interceptors.request.use(config => {
  let {method} = config
  if (method === 'get') {
    config.headers = {token: 123, time: new Date().getTime()}
  } else if (method === 'post') {
    config.data = {...config.data, token: 123}
  }
  return config
})
Raxios.interceptors.response.use(response => {
  if (response.status === SUCCESS) {
    let {data} = response
    return data
  }
})
