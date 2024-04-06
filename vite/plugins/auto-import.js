/*
 * @Description  : 自动引入vue相关API
 * @Author       : hzf
 * @Date         : 2022-08-27
 * @LastEditors  : hzf
 * @LastEditTime : 2024-04-06
 * @FilePath     : \vue3-admin\vite\plugins\auto-import.js
 */
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createAutoImport() {
  return AutoImport({
    imports: [
      'vue',
      'vue-router',
      {
        vue: ['defineProps', 'defineEmits', 'defineExpose', 'withDefaults']
      },
      'pinia'
    ],
    eslintrc: {
      enabled: true,
      filepath: './vite/.eslintrc-auto-import.json',
      globalsPropValue: true
    },
    dts: false,
    resolvers: [ElementPlusResolver()],
    // 是否在 vue 模板中自动导入
    vueTemplate: true
  })
}
