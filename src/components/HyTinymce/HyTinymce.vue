<script setup>
import Editor from '@tinymce/tinymce-vue'

defineOptions({ name: 'HyTinymce' })

const props = defineProps({
  value: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  placeholder: { type: String, default: '请输入' },
  height: { type: Number, default: 300 },
  plugins: {
    type: [String, Array],
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
      'checklist'
    ]
  },
  toolbar: {
    type: [String, Array],
    default:
      'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat'
  }
})
const emit = defineEmits(['update:value'])

const content = ref(props.value)

const init = computed(() => {
  return {
    branding: false,
    promotion: false,
    onboarding: false,
    language: 'zh_CN',
    language_url: '/vue3-admin/tinymce/langs/zh_CN.js',
    height: props.height,
    plugins: props.plugins,
    toolbar: props.toolbar,
    skin_url: '/vue3-admin/tinymce/skins/ui/oxide',
    toolbar_mode: 'wrap',
    placeholder: props.placeholder
  }
})

watch(
  () => props.value,
  newVal => {
    if (newVal !== content.value) {
      content.value = newVal
    }
  },
  { immediate: true }
)

let debounceTimer = null
watch(
  () => content.value,
  newValue => {
    if (debounceTimer) {
      clearTimeout(debounceTimer)
    }
    debounceTimer = setTimeout(() => {
      emit('update:value', newValue)
    }, 300)
  }
)

onBeforeUnmount(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})
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
