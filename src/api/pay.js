import request from '@/utils/request'

// 获取vip数据列表
export const getVipPayList = () => {
  return request({
    url: '/user/vip/pay/list'
  })
}
