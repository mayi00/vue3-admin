<script setup>
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import api from '@/api'
import { getDictList } from '@/tools/tools.js'

const props = defineProps({
  visible: { type: Boolean, default: false },
  isEdit: { type: Boolean, default: false },
  menuData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:visible', 'success'])

const formRef = ref(null)
const originalMenuForm = {
  id: '',
  parentId: '',
  menuType: 'MENU',
  sort: 1,
  visible: 1,
  path: '',
  component: '',
  name: '',
  meta: {
    title: '',
    icon: '',
    link: '',
    keepAlive: false
  }
}
const menuForm = ref({})
const formRules = computed(() => {
  return {
    menuType: [{ required: true, message: '请选择菜单类型', trigger: ['change'] }],
    parentId: [{ required: menuForm.value.menuType !== 'MODULE', message: '请选择上级菜单', trigger: ['change'] }],
    sort: [{ required: true, message: '请输入排序', trigger: ['blur'] }],
    path: [
      {
        required: ['MENU', 'IFRAME_LINK', 'EXT_LINK'].includes(menuForm.value.menuType),
        message: '请输入路由路径',
        trigger: ['blur']
      }
    ],
    component: [{ required: menuForm.value.menuType === 'MENU', message: '请输入组件路径', trigger: ['blur'] }],
    name: [{ required: menuForm.value.menuType === 'MENU', message: '请输入菜单名称', trigger: ['blur'] }],
    meta: {
      title: [{ required: true, message: '请输入菜单名称', trigger: ['blur'] }],
      link: [{ required: menuForm.value.menuType === 'IFRAME_LINK', message: '请输入内链地址', trigger: ['blur'] }]
    }
  }
})
// 树形菜单数据
const menuTree = ref([])
const menuTreeProps = {
  label(node) {
    return node.meta.title
  },
  value: 'id'
}
const getMenuTree = async () => {
  const menuRes = await api.sys.menu.list()
  if (menuRes.code === 0) {
    menuTree.value = menuRes.data
  }
}

watch(
  () => props.visible,
  newVal => {
    if (newVal) {
      getMenuTree()
      menuForm.value = cloneDeep(originalMenuForm)
      if (props.isEdit) menuForm.value = Object.assign({}, menuForm.value, JSON.parse(JSON.stringify(props.menuData)))
    }
  }
)

// 确认提交
const handleConfirm = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      try {
        if (props.isEdit) {
          // 编辑菜单
          const res = await api.sys.menu.update(menuForm.value)
          if (res.code === 0) {
            ElMessage.success('编辑菜单成功')
          } else {
            ElMessage.error(res.message || '编辑菜单失败')
          }
        } else {
          // 新增菜单
          const res = await api.sys.menu.add(menuForm.value)
          if (res.code === 0) {
            ElMessage.success('新增菜单成功')
          } else {
            ElMessage.error(res.message || '新增菜单失败')
          }
        }

        emit('success')
        emit('update:visible', false)
      } catch (error) {
        console.error('操作菜单失败:', error)
      }
    }
  })
}
// 关闭对话框
const handleCancel = () => {
  formRef.value?.resetFields()
  emit('update:visible', false)
}
</script>

<template>
  <el-dialog :model-value="visible" :title="isEdit ? '编辑' : '新增'" width="500px" :close-on-click-modal="false">
    <el-form ref="formRef" :model="menuForm" :rules="formRules" label-width="100px">
      <el-form-item label="菜单类型" prop="menuType">
        <el-select v-model="menuForm.menuType" style="width: 100%" placeholder="请选择菜单类型" clearable>
          <el-option
            v-for="item in getDictList('MENU_TYPE')"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="menuForm.menuType !== 'MODULE'" label="上级菜单" prop="parentId">
        <el-tree-select
          v-model="menuForm.parentId"
          :data="menuTree"
          :props="menuTreeProps"
          :render-after-expand="false"
          check-strictly
          style="width: 100%"
          placeholder="选择上级菜单"
          clearable
        />
      </el-form-item>
      <el-form-item label="菜单名称" prop="meta.title">
        <el-input v-model="menuForm.meta.title" placeholder="请输入菜单名称" clearable />
      </el-form-item>
      <el-form-item label="是否隐藏" prop="visible">
        <el-switch
          v-model="menuForm.visible"
          inline-prompt
          :active-value="1"
          :inactive-value="0"
          active-text="显示"
          inactive-text="隐藏"
        />
      </el-form-item>
      <el-form-item label="访问路径" prop="path">
        <el-input v-model="menuForm.path" placeholder="请输入访问路径" clearable />
      </el-form-item>
      <el-form-item v-if="menuForm.menuType === 'MENU'" label="组件路径" prop="component">
        <el-input v-model="menuForm.component" placeholder="请输入组件路径" clearable>
          <template #prepend>src/views/</template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="menuForm.menuType === 'IFRAME_LINK'" label="内链地址" prop="meta.link">
        <el-input v-model="menuForm.meta.link" placeholder="请输入内链" clearable>
          <template #prepend>http://</template>
        </el-input>
      </el-form-item>
      <el-form-item
        v-if="menuForm.menuType !== 'MODULE' && menuForm.menuType !== 'CATALOG' && menuForm.menuType !== 'EXT_LINK'"
        label="路由 name"
        prop="name"
      >
        <el-input v-model="menuForm.name" placeholder="请输入路由名称" clearable />
      </el-form-item>
      <el-form-item label="图标" prop="meta.icon">
        <el-input v-model="menuForm.meta.icon" placeholder="请输入图标名称" clearable />
      </el-form-item>
      <el-form-item
        v-if="menuForm.menuType !== 'MODULE' && menuForm.menuType !== 'CATALOG'"
        label="缓存"
        prop="meta.keepAlive"
      >
        <el-switch
          v-model="menuForm.meta.keepAlive"
          inline-prompt
          :active-value="true"
          :inactive-value="false"
          active-text="开启"
          inactive-text="关闭"
        />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="menuForm.sort" :min="1" :max="9999" :precision="0" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
