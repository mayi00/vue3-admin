<script setup>
defineOptions({ name: 'Login' })

const router = useRouter()

function handleLogin() {
  console.log('handleLogin')
  localStorage.setItem('token', '123456')
  router.push('/')
}
</script>

<template>
  <div class="">
    <el-button @click="handleLogin">Login</el-button>
  </div>
</template>

<style lang="less" scoped></style>
