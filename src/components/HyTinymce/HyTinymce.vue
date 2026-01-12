<script setup>
import Editor from '@tinymce/tinymce-vue'

defineOptions({ name: 'HyTinymce' })

const props = defineProps({
  value: { type: String, default: '' }
})
const emit = defineEmits(['update:value'])

const init = computed(() => {
  return {
    language_url: '/vue3-admin/tinymce/langs/zh_CN.js',
    language: 'zh_CN',
    toolbar_mode: 'sliding',
    plugins: [
      // Core editing features
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
      // Your account includes a free trial of TinyMCE premium features
      // Try the most popular premium features until Jan 26, 2026:
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
    ],
    toolbar:
      'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography uploadcare | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
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
</script>

<template>
  <main id="sample">
    <Editor
      api-key="uex0cgm72otveima6y89tgtsmypr29g7141zukq7kfuni2r3"
      :init="init"
      initial-value="Welcome to TinyMCE!"
    />
  </main>
</template>
