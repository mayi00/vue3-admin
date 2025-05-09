<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { useUserStore, useAppStore } from '@/store'

defineOptions({ name: 'Login' })

const router = useRouter()

const loginFormRef = ref()
const loginForm = ref({
  username: 'admin',
  password: '123456',
})
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度6-16位', trigger: 'blur' },
  ],
})
const loading = ref(false)

function handleLogin() {
  loginFormRef.value.validate(valid => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        const token = useUserStore().generateToken(loginForm.value.username)
        localStorage.setItem('token', token)
        useUserStore().setUserInfo({ username: loginForm.value.username })
        ElMessage({ type: 'success', message: '登录成功' })
        loading.value = false
        router.push('/home')
      }, 1000)
    }
  })
}
</script>

<template>
  <div class="g-container login-container">
    <div class="login-wrapper">
      <div class="login-form">
        <h2 class="login-title">vue3-admin</h2>

        <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginForm.username"
              placeholder="请输入用户名"
              size="large"
              :prefix-icon="User"
              maxlength="16"
              clearable
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model.trim="loginForm.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              show-password
              maxlength="16"
              clearable
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
        </el-form>

        <el-button type="primary" size="large" class="login-btn" :loading="loading" @click="handleLogin">
          登录
        </el-button>
      </div>

      <div class="login-copyright">
        <Copyright />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  padding: 0;
  // background: url('@/assets/images/bg.jpg') no-repeat center center;
  // background-size: cover;
  background: linear-gradient(120deg, var(--gray-12) 0%, var(--gray-6) 100%);
}

.login-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-form {
  padding: 32px;
  width: 400px;
  background-color: var(--gray-1);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);

  .login-title {
    margin: 0 0 32px;
    text-align: center;
    font-size: 24px;
    line-height: 32px;
    color: var(--gray-13);
    letter-spacing: 2px;
  }

  .login-btn {
    width: 100%;
  }
}

.login-copyright {
  margin-top: 16px;
}
</style>
