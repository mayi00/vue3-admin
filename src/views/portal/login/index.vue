<script setup>
import { loginRoutes } from '@/router/modules/login'

defineOptions({ name: 'PortalLogin' })

const router = useRouter()

const handleClick = item => {
  router.push(item.path)
}
</script>

<template>
  <div class="g-container p-[20px]">
    <el-row :gutter="20">
      <el-col :span="12" v-for="(item, i) in loginRoutes" :key="`${item.path}-${i}`" :md="6" :lg="4" :xl="3">
        <el-card>
          <p>{{ item.meta.title }} 页面{{ i + 1 }}</p>
          <el-button @click="handleClick(item)">跳转</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="less" scoped></style>
