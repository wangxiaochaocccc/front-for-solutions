import request from '@/utils/request'

// 获取pexels列表
export const getPexels = (data) => {
  return request({
    url: '/pexels/list',
    params: data
  })
}
