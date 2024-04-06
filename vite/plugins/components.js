/*
 * @Description  : 自动引入ElementPlus组件和src/omponents文件夹下的组件
 * @Author       : hzf
 * @Date         : 2022-08-27
 * @LastEditors  : hzf
 * @LastEditTime : 2024-01-13
 * @FilePath     : \h5-vite5\vite\plugins\components.js
 */
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createComponents() {
  return Components({
    // 默认导入组件文件夹，组件会自动引入
    dirs: ['src/components'],
    // ElementPlus组件自动按需引入
    resolvers: [ElementPlusResolver()]
  })
}
