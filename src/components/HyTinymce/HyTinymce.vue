<script setup>
import Editor from '@tinymce/tinymce-vue'

defineOptions({ name: 'HyTinymce' })

const props = defineProps({
  value: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '请输入' },
  height: { type: Number, default: 300 },
  plugins: {
    type: Array,
    default: () => [
      'anchor',
      'autolink',
      'charmap',
      'codesample',
      'emoticons',
      'link',
      'lists',
      'media',
      'searchreplace',
      'table',
      'visualblocks',
      'wordcount',
      'checklist',
      'mediaembed',
      'casechange',
      'formatpainter',
      'pageembed',
      'a11ychecker',
      'tinymcespellchecker',
      'permanentpen',
      'powerpaste',
      'advtable',
      'advcode',
      'advtemplate',
      'ai',
      'uploadcare',
      'mentions',
      'tinycomments',
      'tableofcontents',
      'footnotes',
      'mergetags',
      'autocorrect',
      'typography',
      'inlinecss',
      'markdown',
      'importword',
      'exportword',
      'exportpdf'
    ]
  },
  toolbar: {
    type: String,
    default:
      'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat'
  }
})
const emit = defineEmits(['update:value'])

const content = ref('')

const init = computed(() => {
  return {
    // 去除tinyMCE的logo
    branding: false,
    // 去除右上角的按钮
    promotion: false,
    // 中文语言
    language: 'zh_CN',
    // 中文语言包路径
    language_url: '/vue3-admin/tinymce/langs/zh_CN.js',
    height: props.height,
    plugins: props.plugins,
    toolbar: props.toolbar,
    toolbar_mode: 'sliding',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    mergetags_list: [
      { value: 'First.Name', title: 'First Name' },
      { value: 'Email', title: 'Email' }
    ],
    ai_request: (request, respondWith) =>
      respondWith.string(() => Promise.reject('See docs to implement AI Assistant')),
    uploadcare_public_key: '42774401878b6a9bc700'
  }
})

watch(
  () => props.value,
  newVal => {
    content.value = newVal
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<template>
  <Editor
    v-model="content"
    api-key="uex0cgm72otveima6y89tgtsmypr29g7141zukq7kfuni2r3"
    :init="init"
    :disabled="disabled"
    :placeholder="placeholder"
  />
</template>
