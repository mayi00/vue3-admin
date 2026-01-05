<script setup>
import { ElMessage } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import api from '@/api'
import { getDictList } from '@/tools/tools.js'

const props = defineProps({
  visible: { type: Boolean, default: false },
  isEdit: { type: Boolean, default: false },
  orgData: { type: Object, default: () => ({}) }
})

const emit = defineEmits(['update:visible', 'success'])

const formRef = ref(null)
const originalOrgForm = {
  id: '',
  parentId: '',
  orgName: '',
  orgType: '',
  sort: 1,
  orgCode: '',
  remark: ''
}
const orgForm = ref(originalOrgForm)
const formRules = computed(() => {
  return {
    orgName: [{ required: true, message: '请输入机构名称', trigger: ['blur'] }],
    orgType: [{ required: true, message: '请选择机构分类', trigger: ['change'] }],
    parentId: [{ required: orgForm.value.orgType !== 'COMPANY', message: '请选择上级机构', trigger: ['change'] }],
    sort: [{ required: true, message: '请输入排序', trigger: ['blur'] }],
    orgCode: [{ required: true, message: '请输入机构码', trigger: ['blur'] }]
  }
})
// 机构树形数据
const orgTree = ref([])
const defaultExpandedKeys = ref([])
const orgTreeProps = {
  label: 'orgName',
  value: 'id'
}
const getOrgTree = async () => {
  const orgRes = await api.sys.organization.list()
  if (orgRes.code === 0) {
    orgTree.value = orgRes.data
    defaultExpandedKeys.value = orgTree.value.map(item => item.id)
  }
}

watch(
  () => props.visible,
  newVal => {
    if (newVal) {
      getOrgTree()
      if (props.isEdit) {
        orgForm.value = Object.assign({}, JSON.parse(JSON.stringify(props.orgData)))
      } else {
        orgForm.value = Object.assign({}, cloneDeep(originalOrgForm), JSON.parse(JSON.stringify(props.orgData)))
      }
    }
  }
)
const loading = ref(false)
// 确认提交
const handleConfirm = () => {
  formRef.value.validate(async valid => {
    if (valid) {
      try {
        loading.value = true
        if (props.isEdit) {
          // 编辑机构
          const res = await api.sys.organization.update(orgForm.value)
          if (res.code === 0) {
            ElMessage.success('编辑机构成功')
          } else {
            ElMessage.error(res.message || '编辑机构失败')
          }
        } else {
          // 新增机构
          const res = await api.sys.organization.add(orgForm.value)
          if (res.code === 0) {
            ElMessage.success('新增机构成功')
          } else {
            ElMessage.error(res.message || '新增机构失败')
          }
        }

        emit('success')
        emit('update:visible', false)
      } catch (error) {
        console.error('操作机构失败:', error)
      } finally {
        loading.value = false
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
  <el-dialog
    :model-value="visible"
    :title="isEdit ? '编辑' : '新增'"
    width="500px"
    :close-on-click-modal="false"
    @close="handleCancel"
  >
    <el-form ref="formRef" :model="orgForm" :rules="formRules" label-width="100px">
      <el-form-item label="机构分类" prop="orgType">
        <el-select v-model="orgForm.orgType" style="width: 100%" placeholder="请选择机构分类" clearable>
          <el-option
            v-for="item in getDictList('ORG_TYPE')"
            :key="item.dictValue"
            :label="item.dictLabel"
            :value="item.dictValue"
          />
        </el-select>
      </el-form-item>
      <el-form-item v-if="orgForm.orgType !== 'COMPANY'" label="上级机构" prop="parentId">
        <el-tree-select
          v-model="orgForm.parentId"
          :data="orgTree"
          :props="orgTreeProps"
          :render-after-expand="false"
          check-strictly
          node-key="id"
          :default-expanded-keys="defaultExpandedKeys"
          style="width: 100%"
          placeholder="选择上级机构"
          clearable
        />
      </el-form-item>
      <el-form-item label="机构名称" prop="orgName">
        <el-input v-model="orgForm.orgName" placeholder="请输入机构名称" clearable />
      </el-form-item>
      <el-form-item label="机构码" prop="orgCode">
        <el-input v-model="orgForm.orgCode" :disabled="isEdit" placeholder="请输入机构码" clearable />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="orgForm.sort" :min="1" :max="9999" :precision="0" />
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input
          v-model="orgForm.remark"
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4 }"
          placeholder="请输入备注"
          :maxlength="200"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleConfirm">确定</el-button>
    </template>
  </el-dialog>
</template>

<style lang="less" scoped></style>
