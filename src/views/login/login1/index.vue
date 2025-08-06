<script setup>
defineOptions({ name: 'Login1' })

const router = useRouter()

function handleLogin() {
  console.log('handleLogin')
  localStorage.setItem('token', 'Login1')
  router.push('/')
}
</script>

<template>
  <div class="">
    <el-button @click="handleLogin">Login1</el-button>
  </div>
</template>

<style lang="less" scoped></style>
