<script setup>
defineOptions({ name: 'FdmPanel' })

const props = defineProps({
  class: {
    type: String,
    default: ''
  }
})
const emit = defineEmits([])
// 暴露方法给父组件
defineExpose({})
</script>

<template>
  <div class="panel" :class="class">
    <div class="panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.panel {
  position: relative;
  border: 2px solid #0a43bc;
  border-image: url(../../../assets/images/screen/fdm/border.png) 51 38 21 132;
  border-width: 51px 38px 21px 132px;
}

.panel-content {
  position: absolute;
  top: -51px;
  right: -38px;
  bottom: -21px;
  left: -132px;
  padding: 20px;
  overflow: hidden;
}
</style>
