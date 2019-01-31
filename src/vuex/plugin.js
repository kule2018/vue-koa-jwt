import localforage from 'localforage'
import * as TYPES from './mutations-types'
import { setToken as httpSetToken } from '../utils/http'

export default (store) => {
  store.subscribe((mutation, { token }) => {
    console.log()
    if (TYPES.SET_TOKEN === mutation.type) {
      // 将 token 写入本地存储
      localforage.setItem('AuthToken', token)
      // 为 axios 实例添加带有 token 授权的 http 请求头
      httpSetToken(token)
    }
  })
}
