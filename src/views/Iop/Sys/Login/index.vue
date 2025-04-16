<script setup>
import { encryptECB } from '@/utils/aesUtils'
import ioplifeAPI from '@/api/ioplife'

defineOptions({ name: 'IopLogin' })

// 登录
function handleLogin() {
  const data = {
    userName: 'luxun',
    password: encryptECB('poikt@test2020', process.env.VITE_IOP_AES_SECRET_KEY),
  }
  ioplifeAPI.sys.auth
    .login(data)
    .then(res => {
      console.log(res)
      localStorage.setItem('user', JSON.stringify(res))
    })
    .catch(err => {
      console.log(err)
    })
}

// 获取用户信息
function getUserProfile() {
  ioplifeAPI.sys.user
    .userProfile()
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}
</script>

<template>
  <div class="g-container">
    <el-button type="primary" @click="handleLogin">Login</el-button>
    <el-button type="primary" @click="getUserProfile">getUserProfile</el-button>
  </div>
</template>

<style lang="less" scoped></style>
