<script setup>
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

defineOptions({ name: 'WangEditor' })

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
// 内容 HTML
const valueHtml = ref('')
// 工具栏配置
const toolbarConfig = {}
// 编辑器配置
const editorConfig = ref({
  placeholder: '请输入内容...',
  readOnly: false,
  autoFocus: true,
  scroll: true,
})

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value =
      '<h2>模拟 Ajax 异步设置内容</h2><p><br></p><hr/><table style="width: auto;"><tbody><tr><th colSpan="1" rowSpan="1" width="135"></th><th colSpan="1" rowSpan="1" width="61"></th><th colSpan="1" rowSpan="1" width="102"></th></tr><tr><td colSpan="1" rowSpan="1" width="auto">1</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr><tr><td colSpan="1" rowSpan="1" width="auto">2</td><td colSpan="1" rowSpan="1" width="auto"></td><td colSpan="1" rowSpan="1" width="auto"></td></tr></tbody></table><p><br></p>'
  }, 1000)
})

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

// 编辑器创建完毕
const handleCreated = editor => {
  console.log('created', editor)

  editorRef.value = editor // 记录 editor 实例，重要！
}

// 编辑器内容、选区变化时的回调函数
const handleChange = editor => {
  console.log('change:', editor.children)
}
// 编辑器销毁
const handleDestroyed = editor => {
  console.log('destroyed', editor)
}
// 编辑器 focus 时的回调函数
const handleFocus = editor => {
  console.log('focus', editor)
}
// 编辑器 blur 时的回调函数
const handleBlur = editor => {
  console.log('blur', editor)
}
// 自定义粘贴
const customPaste = (editor, event, callback) => {
  console.log('ClipboardEvent 粘贴事件对象', event)
  // const html = event.clipboardData.getData('text/html') // 获取粘贴的 html
  // const text = event.clipboardData.getData('text/plain') // 获取粘贴的纯文本
  // const rtf = event.clipboardData.getData('text/rtf') // 获取 rtf 数据（如从 word wsp 复制粘贴）

  // 自定义插入内容
  editor.insertText('xxx')

  // 返回 false ，阻止默认粘贴行为
  event.preventDefault()
  callback(false) // 返回值（注意，vue 事件的返回值，不能用 return）

  // 返回 true ，继续默认的粘贴行为
  // callback(true)
}
// 自定义编辑器 alert
const customAlert = (info, type) => {
  alert(`【自定义提示】${type} - ${info}`)
}
</script>

<template>
  <div class="g-container">
    <el-card>
      <div class="editor-container">
        <Toolbar
          style="border-bottom: 1px solid #ccc"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          mode="default"
        />
        <Editor
          v-model="valueHtml"
          style="min-height: 300px"
          :defaultConfig="editorConfig"
          mode="simple"
          @onCreated="handleCreated"
          @onChange="handleChange"
          @onDestroyed="handleDestroyed"
          @onFocus="handleFocus"
          @onBlur="handleBlur"
          @customAlert="customAlert"
          @customPaste="customPaste"
        />
      </div>

      <div class="echo">{{ valueHtml }}</div>
    </el-card>
  </div>
</template>

<style lang="less" scoped>
.editor-container {
  width: 600px;
  // height: 400px;
  border: 1px solid #ccc;
}

.echo {
  margin-top: 16px;
}
</style>
