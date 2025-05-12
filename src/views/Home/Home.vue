<script setup>
defineOptions({ name: 'Home' })

const router = useRouter()

function goExample() {
  router.push({ name: 'Example' })
}

const value = ref(new Date())

// 控制上传弹框的显示/隐藏
const dialogVisible = ref(false)
// 上传文件时的loading
const loading = ref(false)

function handleUploadDialog() {
  dialogVisible.value = true
}
function handleUploadConfirm(fileList) {
  console.log('fileList', fileList)

  dialogVisible.value = false
}
function handleUploadDialogClose() {
  dialogVisible.value = false
}
</script>

<template>
  <div class="g-container">
    <el-card>
      <div class="mb-4">
        <el-button @click="handleUploadDialog">dialogVisible</el-button>
        <el-button @click="goExample">Example</el-button>
        <el-button type="primary">{{ $t('common.add') }}</el-button>
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

      <el-calendar v-model="value" />
      <p v-for="i in 10" :key="i">Home{{ i }}</p>
    </el-card>

    <FileUpload
      :dialog-visible="dialogVisible"
      accept=".xls,.xlsx"
      :multiple="true"
      limit="2"
      :maxSize="1024 * 4"
      :loading="loading"
      @on-confirm="handleUploadConfirm"
      @on-cancel="handleUploadDialogClose"
    />
  </div>
</template>

<style lang="less" scoped></style>
