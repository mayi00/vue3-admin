<script setup>
import imgLogo from '@/assets/icons/vue.svg'

defineOptions({ name: 'UserAvatar' })

const router = useRouter()

const logo = ref(imgLogo)

function logout() {
  ElMessageBox.confirm('请确认是否退出登录？', '提示', {
    confirmButtonText: '退出登录',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(() => {
      localStorage.clear()
      router.push({ path: '/login' })
      ElMessage({
        type: 'success',
        message: '已退出登录',
      })
    })
    .catch(() => {})
}
</script>

<template>
  <el-dropdown trigger="hover">
    <div class="user-avatar">
      <el-avatar :size="24" :src="logo" />
      <span class="username g-no-select g-single-ellipsis">张三四五六七 jiushiqfuewn ireavhreujfl</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="less" scoped>
.user-avatar {
  display: flex;
  align-items: center;
  cursor: pointer;
  margin: 0 8px;

  .username {
    margin-left: 4px;
    max-width: 100px;
  }
}
</style>
