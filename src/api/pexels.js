import request from '@/utils/request'

// 获取pexels列表
export const getPexels = (data) => {
  return request({
    url: '/pexels/list',
    params: data
  })
}
// 获取hint
export const getHint = (q) => {
  return request({
    url: '/pexels/hint',
    params: { q }
  })
}
