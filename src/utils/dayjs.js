import Vue from 'vue'
// 引入dayjs
import dayjs from 'dayjs'
// 引入中文语言包
import 'dayjs/locale/zh-cn'
// 引入 相对时间 格式
import relativeTime from 'dayjs/plugin/relativeTime'
// 全局使用中文语言包
dayjs.locale('zh-cn')
// 配置使用 相对时间 格式
dayjs.extend(relativeTime)
// 全局注册过滤器
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})
