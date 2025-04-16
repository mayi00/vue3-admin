<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { getRandomString } from '@/utils/utils'
import { encryptCBC } from '@/utils/aesUtils'

defineOptions({
  name: 'Login',
})

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

function handleLogin() {
  loginFormRef.value.validate(valid => {
    if (valid) {
      const randomStr = getRandomString()
      const currentTime = dayjs().valueOf()
      const expirationTime = dayjs(currentTime).add(1, 'hour').valueOf()
      const token = encryptCBC(`${loginForm.value.username}-${randomStr}-${currentTime}-${expirationTime}`, process.env.VITE_AES_SECRET_KEY, process.env.VITE_AES_SECRET_IV)
      localStorage.setItem('token', token)
      router.push('/home')
      ElMessage({
        type: 'success',
        message: '登录成功',
      })
    }
  })
}

const copyrightYear = dayjs().format('YYYY')
</script>

<template>
  <div class="login-container">
    <div class="login-form">
      <h2 class="login-title">vue3-admin</h2>
      <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            size="large"
            :prefix-icon="User"
            maxlength="16"
            clearable
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
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

      <el-button type="primary" size="large" class="login-btn" @click="handleLogin">登录</el-button>
    </div>

    <div class="login-footer">
      <span>Copyright © {{ copyrightYear }} MDT All Rights Reserved.</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  position: relative;
  overflow-y: auto;
  width: 100%;
  height: 100%;
  background: url('@/assets/images/bg.jpg') no-repeat center center;
  background-size: cover;
}

.login-title {
  margin: 0 0 32px;
  text-align: center;
  font-size: 24px;
  line-height: 32px;
  color: var(--gray-13);
}

.login-form {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 32px;
  width: 420px;
  background-color: var(--gray-1);
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-light);

  .login-btn {
    width: 100%;
  }
}

.login-footer {
  position: absolute;
  bottom: 16px;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
