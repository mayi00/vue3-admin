<script setup>
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  isEdit: {
    type: Boolean,
    default: false
  },
  menuData: {
    type: Object,
    default: () => ({})
  },
  flatMenuList: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['update:visible', 'success'])

const formRef = ref(null)
const menuForm = ref({
  id: '',
  menuType: 'MENU',
  sort: 0,
  visible: 1,
  name: '',
  path: '',
  component: '',
  meta: {
    title: '',
    icon: '',
    keepAlive: false
  },
  parentId: ''
})

// 监听菜单数据变化
watch(
  () => props.menuData,
  newVal => {
    if (newVal) {
      menuForm.value = JSON.parse(JSON.stringify(newVal))
    }
  },
  { deep: true }
)

// 监听可见性变化
watch(
  () => props.visible,
  newVal => {
    if (newVal && !props.isEdit) {
      // 新增时重置表单
      resetForm()
    }
  }
)

// 重置表单
const resetForm = () => {
  menuForm.value = {
    id: '',
    menuType: 'MENU',
    sort: 0,
    visible: 1,
    name: '',
    path: '',
    component: '',
    meta: {
      title: '',
      icon: '',
      keepAlive: false
    },
    parentId: ''
  }
}

// 关闭对话框
const handleCancel = () => {
  emit('update:visible', false)
}

// 确认提交
const handleConfirm = () => {
  if (!menuForm.value.name || !menuForm.value.meta.title) {
    ElMessage.warning('请填写菜单名称和显示标题')
    return
  }

  emit('success', menuForm.value)
  emit('update:visible', false)
}
</script>

<template>
  <el-dialog :model-value="visible" :title="isEdit ? '编辑' : '新增'" width="500px" :close-on-click-modal="false">
    <el-form :model="menuForm" label-width="80px">
      <el-form-item label="菜单类型">
        <el-select v-model="menuForm.menuType" style="width: 100%">
          <el-option label="模块" value="MODULE" />
          <el-option label="目录" value="CATALOG" />
          <el-option label="菜单" value="MENU" />
        </el-select>
      </el-form-item>
      <el-form-item label="父菜单">
        <el-select v-model="menuForm.parentId" style="width: 100%" placeholder="选择父菜单（可选）">
          <el-option label="根菜单" value="" />
          <el-option
            v-for="menu in flatMenuList"
            :key="menu.id"
            :label="menu.title"
            :value="menu.id"
            :disabled="menu.id === menuForm.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name" required>
        <el-input v-model="menuForm.name" placeholder="请输入菜单名称" />
      </el-form-item>
      <el-form-item label="显示标题" prop="meta.title" required>
        <el-input v-model="menuForm.meta.title" placeholder="请输入显示标题" />
      </el-form-item>
      <el-form-item label="排序">
        <el-input-number v-model="menuForm.sort" :min="0" />
      </el-form-item>
      <el-form-item label="可见性">
        <el-switch v-model="menuForm.visible" />
      </el-form-item>
      <el-form-item label="路径">
        <el-input v-model="menuForm.path" placeholder="请输入路径" />
      </el-form-item>
      <el-form-item label="组件路径">
        <el-input v-model="menuForm.component" placeholder="请输入组件路径" />
      </el-form-item>
      <el-form-item label="图标">
        <el-input v-model="menuForm.meta.icon" placeholder="请输入图标名称" />
      </el-form-item>
      <el-form-item label="缓存">
        <el-switch v-model="menuForm.meta.keepAlive" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
