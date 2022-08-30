/*
 * @Author: wangchao
 * @Date: 2022-08-28 21:32:08
 * @LastEditors: wangchao
 * @LastEditTime: 2022-08-30 17:21:52
 * @Description: 
 */
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
// 获取推荐主题
export const getThemes = () => {
  return request({
    url: '/pexels/themes',
  })
}