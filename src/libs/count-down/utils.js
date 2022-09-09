import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import duration from 'dayjs/plugin/duration'

// 汉化处理
dayjs.locale('zh')
// duration插件
dayjs.extend(duration)

export default dayjs