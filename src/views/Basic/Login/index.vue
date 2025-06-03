<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { useUserStore } from '@/store'
import { useI18n } from 'vue-i18n'
import { userinfo } from './login'

defineOptions({ name: 'Login' })

const router = useRouter()
const userStore = useUserStore()
const { t } = useI18n()

const loginFormRef = ref()
const loginForm = ref({
  username: 'admin',
  password: '123456',
})
const rules = reactive({
  username: [{ required: true, message: t('login.username_required'), trigger: 'blur' }],
  password: [
    { required: true, message: t('login.password_required'), trigger: 'blur' },
    { min: 6, max: 16, message: t('login.password_length'), trigger: 'blur' },
  ],
})
const loading = ref(false)

function handleLogin() {
  loginFormRef.value.validate(valid => {
    if (valid) {
      loading.value = true
      setTimeout(() => {
        ElMessage({ type: 'success', message: '登录成功' })
        const token = userStore.generateToken(loginForm.value.username)
        localStorage.setItem('token', token)
        userStore.setUserInfo({ ...userinfo })
        router.push('/home')
        loading.value = false
      }, 1000)
    }
  })
}
</script>

<template>
  <div class="g-container login-container">
    <div class="login-wrapper">
      <div class="language-switcher">
        <Language />
      </div>
      <div class="login-form">
        <h2 class="login-title">vue3-admin</h2>

        <el-form :model="loginForm" :rules="rules" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input
              v-model.trim="loginForm.username"
              :placeholder="$t('login.username_placeholder')"
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
              :placeholder="$t('login.password_placeholder')"
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
          {{ $t('login.login') }}
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
  background-color: var(--gray-1);
  border-radius: 4px;
  box-shadow: var(--el-box-shadow-light);

  .login-title {
    margin: 0 0 32px;
    color: var(--gray-13);
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
