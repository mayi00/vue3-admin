<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/store'
import { login } from '@/tools/auth.js'

defineOptions({ name: 'Login0' })

const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref()
const loginForm = ref({
  username: 'admin',
  password: '123456'
})
const rules = reactive({
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 16, message: '长度6-16位', trigger: 'blur' }
  ]
})
const loading = ref(false)

function handleLogin() {
  loginFormRef.value.validate(valid => {
    if (valid) {
      loading.value = true
      login(loginForm.value).then(res => {
        localStorage.setItem('token', res.token)
        userStore.saveUserInfo({ ...res })
        ElMessage({ type: 'success', message: '登录成功' })
        loading.value = false
        router.push('/home')
      })
    }
  })
}
</script>

<template>
  <div class="g-container login-container">
    <div class="login-wrapper">
      <div class="language-switcher">
        <!-- <Language /> -->
      </div>
      <div class="login-form">
        <h2 class="login-title">Vue</h2>

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
  background: linear-gradient(120deg, #141414 0%, #595959 100%);
}

.login-wrapper {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.language-switcher {
  position: absolute;
  top: 24px;
  right: 24px;
}

.login-form {
  width: 400px;
  padding: 32px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);

  .login-title {
    margin: 0 0 32px;
    color: #000;
    font-size: 24px;
    line-height: 32px;
    text-align: center;
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
