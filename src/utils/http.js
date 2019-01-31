import axios from 'axios'

// 创建实例
const http = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 10000
})

// 拦截响应
http.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    if (!error['response']) {
      return Promise.reject(error)
    }
    return Promise.reject(error.response)
  }
)

// 将 token 存放到请求头
export const setToken = token => {
  http.defaults.headers.common.Authorization = `Bearer ${token}`
}

export default http