import request from '@/utils/request'

// 获取分类接口
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