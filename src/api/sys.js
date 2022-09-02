import request from '@/utils/request'

// 获取分类接口
export const getCaptcha = (data) => {
  return request({
    url: '/sys/captcha',
    method: "POST",
    data
  })
}
