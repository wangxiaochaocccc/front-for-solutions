import axios from 'axios'
import store from '../store'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  config.headers.icode = '18BD8822ED2A8B2D'
  if (store.getters.token) {
    config.headers.Authorization = `Bearer ${store.getters.token}`
  }
  return config
})

// 响应拦截器
service.interceptors.response.use((respones) => {
  const { success, message, data } = respones.data
  if (success) {
    return data
  }
  return Promise.reject(new Error(message))
}, (error) => {
  if (error.response?.data?.code === 401) {
    store.dispatch('user/logout')
  }
  return Promise.reject(error)
})

export default service
