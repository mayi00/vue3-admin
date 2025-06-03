<script setup>
import { useUserStore } from '@/store'
import imgLogo from '@/assets/icons/vue.svg'

defineOptions({ name: 'Home' })

const { userInfo } = storeToRefs(useUserStore())

const avatar = ref(imgLogo)
const router = useRouter()
// 当前时间
const currentTime = ref('')
const timer = ref(null)

// 问候语计算属性
const greeting = computed(() => {
  const hours = new Date().getHours()
  if (hours < 6) return '凌晨好'
  if (hours < 9) return '早上好'
  if (hours < 12) return '上午好'
  if (hours < 14) return '中午好'
  if (hours < 18) return '下午好'
  return '晚上好'
})
// 更新时间
const updateTime = () => {
  const now = new Date()
  currentTime.value = now
    .toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    .replace(/\//g, '-')
}

onMounted(() => {
  updateTime()
  timer.value = setInterval(updateTime, 1000)
})

onBeforeUnmount(() => {
  clearInterval(timer.value)
})
</script>

<template>
  <div class="g-container home-container">
    <el-row :gutter="8">
      <el-col :span="16">
        <el-card class="user-card">
          <div class="user-info">
            <el-avatar :size="48" :src="userInfo.avatar" />
            <div class="user-details">
              <h2>{{ greeting }}，{{ userInfo.name }}</h2>
              <p class="time">{{ currentTime }}</p>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-avatar :size="48" :src="userInfo.avatar" />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :span="8">
        <el-card>
          <el-avatar :size="48" :src="userInfo.avatar" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-avatar :size="48" :src="userInfo.avatar" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-avatar :size="48" :src="userInfo.avatar" />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="8">
      <el-col :span="8">
        <el-card>
          <el-avatar :size="48" :src="userInfo.avatar" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-avatar :size="48" :src="userInfo.avatar" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-avatar :size="48" :src="userInfo.avatar" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped>
.home-container {
  gap: 8px;
}

.user-card {
  .user-info {
    display: flex;
    align-items: center;
    gap: 15px;

    .user-details {
      h2 {
        margin: 0;
        color: #333;
        font-size: 18px;
      }

      .time {
        margin: 5px 0 0;
        color: #666;
        font-size: 0.9em;
      }
    }
  }
}
</style>
