import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


NProgress.configure({
  // 缓冲动画类型，可选值 'ease'、'linear'等
  easing: 'ease',
  // 动画速度，单位为毫秒
  speed: 500,
  // 是否显示环形进度动画，在右上角
  showSpinner: false,
  // 每次进度条步进的速度，单位为毫秒
  trickleSpeed: 200,
  // 初始化时的最小百分比
  minimum: 0.1,
})

export default NProgress
