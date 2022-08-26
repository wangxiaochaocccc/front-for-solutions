import axios from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 5000
})

// 请求拦截器
service.interceptors.request.use((config) => {
  config.headers.icode = '73A13B62C86039C2'
  return config
})

// 响应拦截器
service.interceptors.response.use((respones) => {
  const { success, message, data } = respones.data
  if (success) {
    return data
  }
  return Promise.reject(new Error(message))
})

export default service
