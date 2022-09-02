import request from '@/utils/request'

// 验证码
export const getCaptcha = (data) => {
  return request({
    url: '/sys/captcha',
    method: "POST",
    data
  })
}
// 登录
export const loginUser = (data) => {
  return request({
    url: '/sys/login',
    method: "POST",
    data
  })
}
// 获取用户信息
export const getProfile = () => {
  return request({
    url: '/user/profile'
  })
}