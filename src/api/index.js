import {Raxios} from '@http/request'

export const Login = (params) => {
  return Raxios.post('/admin/login', params)
}
