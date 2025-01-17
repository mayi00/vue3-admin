<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import dayjs from 'dayjs'
import { getRandomString } from '@/utils/utils'

defineOptions({
  name: 'Login'
})

const router = useRouter()
const loginForm = ref({
  username: '',
  password: ''
})

function handleLogin() {
  localStorage.setItem('token', getRandomString({}))
  router.push('/home')
}

const copyrightYear = dayjs().format('YYYY')
</script>

<template>
  <div class="g-main login-container">
    <div class="login-form">
      <h2 class="login-title">vue3-admin</h2>
      <ElForm :model="loginForm">
        <ElFormItem prop="username">
          <ElInput
            v-model="loginForm.username"
            placeholder="请输入用户名"
            size="large"
            :prefix-icon="User"
            maxlength="16"
          />
        </ElFormItem>
        <ElFormItem prop="password">
          <ElInput
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            show-password
            maxlength="16"
          >
            <template #prefix>
              <ElIcon><Lock /></ElIcon>
            </template>
          </ElInput>
        </ElFormItem>
      </ElForm>

      <ElButton type="primary" size="large" class="login-btn" @click="handleLogin">登录</ElButton>
    </div>

    <div class="login-footer">
      <span>Copyright © {{ copyrightYear }} MDT All Rights Reserved.</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container {
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
