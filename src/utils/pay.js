import store from '@/store'
import { getAliPay } from '@/api/pay'
import { isMobileTerinal } from '@/utils/flexble'

/**
 * 触发支付宝支付
 * @param {*} title 支付标题
 * @param {*} desc 支付描述
 */
export const alipay = async (title, desc) => {
  // encode 的支付地址
  const { encodeURI } = await getAliPay(
    title,
    '0.01',
    desc,
    isMobileTerinal.value
  )
  // 解构
  window.location.href = decodeURIComponent(encodeURI)
}
