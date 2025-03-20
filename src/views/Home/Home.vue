<script setup>
import { encryptECB } from '@/utils/aesUtils'
import iopsys from '@/api/ioplife/iop-sys'

defineOptions({ name: 'Home' })

const router = useRouter()

function handleAES() {
  console.log(encryptECB('poikt@test2020', process.env.VITE_IOP_AES_SECRET_KEY))
  const data = {
    userName: 'luxun',
    password: encryptECB('poikt@test2020', process.env.VITE_IOP_AES_SECRET_KEY),
  }
  iopsys
    .queryByLoginId(data)
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}

function goExample() {
  router.push({ name: 'Example' })
}
</script>

<template>
  <div class="g-container">
    <div class="mb-4">
      <el-button @click="goExample">Example</el-button>
      <el-button type="primary" @click="handleAES">Primary</el-button>
      <el-button type="success">Success</el-button>
      <el-button type="info">Info</el-button>
      <el-button type="warning">Warning</el-button>
      <el-button type="danger">Danger</el-button>
    </div>
    <div style="font-size: 20px">
      <Edit style="width: 1em; height: 1em; margin-right: 8px" />
      <Share style="width: 1em; height: 1em; margin-right: 8px" />
      <Delete style="width: 1em; height: 1em; margin-right: 8px" />
      <Search style="width: 1em; height: 1em; margin-right: 8px" />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
        style="width: 1em; height: 1em; margin-right: 8px"
      >
        <path
          fill="currentColor"
          d="M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64z"
        ></path>
      </svg>
    </div>

    <el-card>
      <p v-for="i in 10" :key="i">Home{{ i }}</p>
    </el-card>
  </div>
</template>

<style lang="less" scoped></style>
