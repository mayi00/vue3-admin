<script setup>
import { useUserStore } from '@/store'

const userStore = useUserStore()
const { login } = userStore

defineOptions({ name: 'Login1' })

const router = useRouter()
const loading = ref(false)

function handleLogin() {
  loading.value = true
  login({ account: 'admin', password: '123456' }).then(() => {
    ElMessage({ type: 'success', message: '登录成功' })
    loading.value = false
    router.push('/')
  })
}
</script>

<template>
  <div class="">
    <el-button @click="handleLogin">Login</el-button>
  </div>
</template>

<style lang="less" scoped></style>
