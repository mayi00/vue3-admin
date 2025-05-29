import Layout from '@/layout/Layout.vue'

export const exampleRoutes = [
  {
    path: '/example',
    component: Layout,
    meta: { title: '示例', icon: '' },
    children: [
      {
        path: 'student-class-hours',
        name: 'StudentClassHours',
        component: () => import('@/views/Example/StudentClassHours/index.vue'),
        meta: { title: '学生课时', icon: 'mingcute:hours-line' },
      },
      {
        path: 'jisu',
        name: 'Jisu',
        component: () => import('@/views/Example/Jisu/index.vue'),
        meta: { title: '极速数据', icon: 'mingcute:hours-line' },
      },
      {
        path: 'rich-text',
        name: 'RichText',
        meta: { title: '富文本', icon: 'bi:file-earmark-richtext' },
        children: [
          {
            path: 'wang-editor',
            name: 'WangEditor',
            component: () => import('@/views/Example/RichText/WangEditor/index.vue'),
            meta: { title: 'WangEditor', icon: '' },
          },
          {
            path: 'vue-quill-editor',
            name: 'VueQuillEditor',
            component: () => import('@/views/Example/RichText/VueQuillEditor/index.vue'),
            meta: { title: 'VueQuillEditor', icon: 'mdi:quill' },
          },
        ],
      },
      {
        path: 'e-signature',
        name: 'ESignature',
        meta: { title: '电子签名', icon: 'fluent:document-signature-16-regular' },
        children: [
          {
            path: 'vue-esign',
            name: 'VueEsign',
            component: () => import('@/views/Example/ESignature/VueEsign/index.vue'),
            meta: { title: 'VueEsign', icon: 'quill:signature' },
          },
        ],
      },
      {
        path: 'icons',
        name: 'Icons',
        meta: { title: '图标', icon: 'flowbite:grid-outline' },
        children: [
          {
            path: 'element-plus-icons',
            name: 'ElementPlusIcons',
            component: () => import('@/views/Example/Icons/ElementPlusIcons/index.vue'),
            meta: { title: 'ElementPlusIcons', icon: 'ep:element-plus' },
          },
          {
            path: 'iconify',
            name: 'Iconify',
            component: () => import('@/views/Example/Icons/Iconify/index.vue'),
            meta: { title: 'Iconify', icon: 'line-md:iconify2-static' },
          },
          {
            path: 'svg-icons',
            name: 'SvgIcons',
            component: () => import('@/views/Example/Icons/SvgIcons/index.vue'),
            meta: { title: 'SvgIcons', icon: 'tabler:svg' },
          },
        ],
      },
      {
        path: 'table',
        meta: { title: '表格', icon: 'material-symbols:table-outline' },
        children: [
          {
            path: 'famous-aphorism',
            name: 'FamousAaphorism',
            component: () => import('@/views/Example/Table/FamousAaphorism/index.vue'),
            meta: { title: '名人名言', icon: '' },
          },
          {
            path: 'table-b',
            name: 'TableB',
            component: () => import('@/views/Example/Table/TableB/index.vue'),
            meta: { title: 'TableB', icon: '' },
          },
          {
            path: 'table-c',
            name: 'TableC',
            component: () => import('@/views/Example/Table/TableC/index.vue'),
            meta: { title: 'TableC', icon: '', hidden: true },
          },
        ],
      },
      {
        path: 'external-links',
        meta: { title: '外链', icon: 'tabler:external-link' },
        children: [
          {
            path: 'https://element-plus.org/zh-CN/',
            meta: { title: 'Element Plus', icon: 'ep:element-plus', link: 'https://element-plus.org/zh-CN/' },
          },
          {
            path: 'https://element.eleme.cn/#/zh-CN',
            meta: { title: 'Element UI', icon: 'logos:element', link: 'https://element.eleme.cn/#/zh-CN' },
          },
          {
            path: 'https://www.google.cn/chrome/',
            meta: { title: 'Chrome', icon: 'logos:chrome', link: 'https://www.google.cn/chrome/' },
          },
          {
            path: 'https://gitee.com/madt/vue3-admin',
            meta: { title: 'Gitee 仓库', icon: 'simple-icons:gitee', link: 'https://gitee.com/madt/vue3-admin' },
          },
          {
            path: 'https://github.com/mayi00/vue3-admin',
            meta: { title: 'GitHub 仓库', icon: 'mdi:github', link: 'https://github.com/mayi00/vue3-admin' },
          },
          {
            path: 'https://mayi00.github.io/vue3-admin',
            meta: { title: 'Vue3-admin', icon: '', link: 'https://mayi00.github.io/vue3-admin' },
          },
        ],
      },
      {
        path: 'ext-links',
        meta: { title: '外链（内嵌访问）', icon: 'line-md:link' },
        children: [
          {
            path: 'element-plus',
            name: 'ElementPlus',
            component: () => import('@/views/Example/ExtLinks/ExtLinks.vue'),
            meta: {
              title: 'Element Plus',
              icon: 'ep:element-plus',
              link: 'https://element-plus.org/zh-CN/',
              embeddedAccess: true,
            },
          },
          {
            path: 'element-ui',
            name: 'logos:element',
            component: () => import('@/views/Example/ExtLinks/ExtLinks.vue'),
            meta: {
              title: 'Element UI',
              icon: 'logos:element',
              link: 'https://element.eleme.cn/#/zh-CN',
              embeddedAccess: true,
            },
          },
          {
            path: 'chrome',
            name: 'Chrome',
            component: () => import('@/views/Example/ExtLinks/ExtLinks.vue'),
            meta: {
              title: 'Chrome',
              icon: 'mdi:google-chrome',
              link: 'https://www.google.cn/chrome/',
              embeddedAccess: true,
            },
          },
          {
            path: 'gitee',
            name: 'Gitee',
            component: () => import('@/views/Example/ExtLinks/ExtLinks.vue'),
            meta: {
              title: 'Gitee 仓库',
              icon: 'simple-icons:gitee',
              link: 'https://gitee.com/madt/vue3-admin',
              embeddedAccess: true,
            },
          },
          {
            path: 'github',
            name: 'GitHub',
            component: () => import('@/views/Example/ExtLinks/ExtLinks.vue'),
            meta: {
              title: 'GitHub 仓库',
              icon: 'mdi:github',
              link: 'https://github.com/mayi00/vue3-admin',
              embeddedAccess: true,
            },
          },
          {
            path: 'online-preview',
            name: 'OnlinePreview',
            component: () => import('@/views/Example/ExtLinks/ExtLinks.vue'),
            meta: {
              title: 'Vue3-admin',
              icon: '',
              link: 'https://mayi00.github.io/vue3-admin',
              embeddedAccess: true,
            },
          },
        ],
      },
    ],
  },
]
