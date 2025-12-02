<script setup>
import imgLogo from '@/assets/svg/vue.svg'
import { useStore } from '@/store'

defineOptions({ name: 'UserAvatar' })

const router = useRouter()
const { userInfo } = storeToRefs(useStore().userStore)

const avatar = ref(imgLogo)

function handleLogout() {
  ElMessageBox.confirm('请确认是否退出登录？', '提示', {
    confirmButtonText: '退出登录',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      useStore().userStore.logout()
      useStore().permissionStore.$reset()
      router.push({ path: '/login' })
      ElMessage({
        type: 'success',
        message: '已退出登录'
      })
    })
    .catch(() => {})
}
</script>

<template>
  <el-dropdown trigger="hover">
    <div class="user-avatar">
      <el-avatar :size="24" :src="userInfo.avatar || avatar" />
      <span class="name g-unselectable g-single-ellipsis">{{ userInfo.name }}</span>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
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

  .name {
    max-width: 100px;
    margin-left: 4px;
  }
}
</style>
