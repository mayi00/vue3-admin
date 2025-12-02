<script setup>
import api from '@/api'

defineOptions({ name: 'Login1' })

const router = useRouter()

function handleLogin() {
  api.sys.auth.login({ account: 'admin', password: '123456' }).then(res => {
    localStorage.setItem('TOKEN', res.data.token)
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
