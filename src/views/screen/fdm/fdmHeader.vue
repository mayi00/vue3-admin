<script setup>
defineOptions({ name: 'FdmHeader' })

const props = defineProps({})
const emit = defineEmits([])
// 暴露方法给父组件
defineExpose({})
</script>

<template>
  <div class="screen-header">
    <img
      src="../../../assets/images/screen/fdm/header.png"
      alt="Fastest Data Monitoring & Display Platform"
      class="header-img"
    />
  </div>
</template>

<style lang="less" scoped>
.screen-header {
  width: 1920px;
  height: 130px;
  text-align: center;

  .header-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
