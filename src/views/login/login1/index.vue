<script setup>
import api from '@/api/apifox/apifox.js'

defineOptions({ name: 'Login1' })

const router = useRouter()

function handleLogin() {
  api.auth.login({ account: 'admin', password: '123456' }).then(res => {
    localStorage.setItem('token', res.data.token)
    router.push('/')
  })
}
</script>

<template>
  <div class="">
    <el-button @click="handleLogin">Login1</el-button>
  </div>
</template>

<style lang="less" scoped></style>
