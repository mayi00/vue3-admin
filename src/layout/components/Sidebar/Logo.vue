<!--
 * @Description  : 侧边栏顶部的 logo
 * @Author       : hzf
 * @Date         : 2022-08-08
 * @LastEditors  : hzf
 * @LastEditTime : 2022-08-08
 * @FilePath     : \vue3-admin\src\layout\components\Sidebar\Logo.vue
-->
<script setup name="Logo">
import { ref } from 'vue'
import imgLogo from '@/assets/icons/vue.svg'

const logo = ref(imgLogo)
</script>

<template>
  <div class="logo-container">
    <img :src="logo" alt="" class="logo">
    <h2 class="title">Vue3-admin</h2>
  </div>
</template>

<style lang="less" scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  text-align: center;
  color: #fff;
  cursor: pointer;
  .logo {
    width: 30px;
    height: 30px;
  }
  .title {
    margin-left: 12px;
    font-size: 18px;
  }
}
</style>
