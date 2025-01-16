<script setup>
defineOptions({
  name: 'Login'
})

const form = ref({
  name: '',
  password: ''
})
</script>

<template>
  <div class="g-main login-container">
    <div class="form-warpper">
      <el-form :model="form" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="form.name" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
        </el-form-item>
      </el-form>
      <el-button type="primary">登录</el-button>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-container {
  background: url('@/assets/images/bg.jpg') no-repeat center center;
  background-size: cover;
}

.form-warpper {
  position: absolute;
  top: 50%;
  right: 20%;
  transform: translate(0, -50%);
  padding: 32px;
  border-radius: 8px;
  width: 360px;
  background-color: var(--gray-1);
}
</style>
