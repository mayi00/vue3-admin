<script setup>
import { ElMessage } from 'element-plus'
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
      localStorage.setItem('iop-user', JSON.stringify(res))
      ElMessage.success('登录成功')
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
// 获取用户信息
function getUserProfile2() {
  ioplifeAPI.sys.user
    .userProfile2()
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
    <el-card>
      <el-button type="primary" @click="handleLogin">Login</el-button>
      <el-button type="primary" @click="getUserProfile">getUserProfile</el-button>
      <el-button type="primary" @click="getUserProfile2">getUserProfile2</el-button>
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>
