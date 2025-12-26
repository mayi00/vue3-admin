<script setup>
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'

defineOptions({ name: 'HyImageCropper' })

const props = defineProps({
  // 是否显示裁剪器
  visible: { type: Boolean, default: false },
  // 裁剪输出图片的格式
  outputType: { type: String, default: 'png' },
  // 裁剪比例
  ratioList: {
    type: Array,
    default: () => [
      { w: 16, h: 9 },
      { w: 4, h: 3 }
    ]
  },
  // 是否启用原图比例
  enableOriginRatio: { type: Boolean, default: true },
  // 是否启用自由裁剪
  enableFreeRatio: { type: Boolean, default: true },
  // 初始比例
  originRatio: { type: String, default: 'free' }
})

const emit = defineEmits(['update:visible', 'confirm'])

// 裁剪器实例
const cropperRef = ref(null)
// 裁剪选项
const option = reactive({
  img: '',
  fixed: false,
  fixedNumber: [16, 9],
  key: Date.now()
})
// 裁剪比例选项
const ratioScope = computed(() => {
  return props.ratioList.map(item => {
    return {
      ...item,
      ratio: `${item.w}:${item.h}`
    }
  })
})
const ratio = ref('')

// 调整裁剪比例
const handleRatioChange = val => {
  if (val === 'origin') {
    setOriginRatio()
    return
  }
  if (val === 'free') {
    option.fixed = false
    option.key = Date.now()
    return
  }
  const [w, h] = val.split(':').map(item => Number(item))
  setRatio({ w, h })
}
// 设置原图比例
const setOriginRatio = () => {
  const img = new Image()
  img.src = option.img
  img.onload = function () {
    setRatio({ w: img.width, h: img.height })
  }
}
// 设置裁剪比例
const setRatio = ({ w, h }) => {
  option.fixed = true
  option.fixedNumber = [w, h]
  option.key = Date.now()
}
// 初始化裁剪比例
const initRatio = () => {
  if (props.originRatio) {
    ratio.value = props.originRatio
    handleRatioChange(ratio.value)
  } else if (ratioScope.value.length) {
    ratio.value = ratioScope.value[0].ratio
    handleRatioChange(ratio.value)
  } else {
    ratio.value = 'free'
    option.fixed = false
    option.key = Date.now()
  }
}

// 图片上传
const beforeUpload = file => {
  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = () => {
    option.img = reader.result
  }
  return false
}

// 确认保存裁剪结果
const handleSave = () => {
  if (!option.img) {
    ElMessage.warning('请先上传图片')
    return
  }

  cropperRef.value.getCropData(data => {
    emit('confirm', data)
    resetCropper()
  })
}

// 重置裁剪器
const resetCropper = () => {
  option.img = ''
  if (cropperRef.value) {
    cropperRef.value.clearCrop()
  }
}
const handleClose = () => {
  emit('update:visible', false)
  resetCropper()
}

onMounted(() => {
  initRatio()
})
</script>

<template>
  <el-dialog :model-value="visible" title="图片裁剪" :width="432" @close="handleClose">
    <vue-cropper
      ref="cropperRef"
      :img="option.img"
      :output-type="outputType"
      :auto-crop="true"
      :auto-crop-width="800"
      :auto-crop-height="450"
      :fixed="option.fixed"
      :fixed-number="option.fixedNumber"
      :key="option.key"
      class="cropper"
    ></vue-cropper>

    <template #footer>
      <div class="cropper-footer">
        <el-upload action="" :before-upload="beforeUpload" :show-file-list="false" accept="image/*">
          <el-button type="primary">上传图片</el-button>
        </el-upload>

        <el-radio-group v-model="ratio" @change="handleRatioChange">
          <el-radio-button v-for="item in ratioScope" :key="item.value" :label="item.ratio" :value="item.ratio" />
          <el-radio-button v-if="enableOriginRatio" label="原图" value="origin" />
          <el-radio-button v-if="enableFreeRatio" label="自由裁剪" value="free" />
        </el-radio-group>

        <el-button type="primary" @click="handleSave">保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped>
.cropper {
  width: 400px;
  height: 225px;
}

.cropper-footer {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}
</style>
