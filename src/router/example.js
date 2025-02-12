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
        component: () => import('@/views/Example/StudentClassHours/StudentClassHours.vue'),
        meta: { title: '学生课时', icon: 'Timer' },
      },
      {
        path: 'rich-text',
        name: 'RichText',
        meta: { title: '富文本', icon: '' },
        children: [
          {
            path: 'wang-editor',
            name: 'WangEditor',
            component: () => import('@/views/Example/RichText/WangEditor/WangEditor.vue'),
            meta: { title: 'WangEditor', icon: '' },
          },
          {
            path: 'vue-quill-editor',
            name: 'VueQuillEditor',
            component: () => import('@/views/Example/RichText/VueQuillEditor/VueQuillEditor.vue'),
            meta: { title: 'VueQuillEditor', icon: '' },
          },
        ],
      },
      {
        path: 'e-signature',
        name: 'ESignature',
        meta: { title: '电子签名', icon: 'EditPen' },
        children: [
          {
            path: 'vue-esign',
            name: 'VueEsign',
            component: () => import('@/views/Example/ESignature/VueEsign/VueEsign.vue'),
            meta: { title: 'VueEsign', icon: 'PictureFilled' },
          },
        ],
      },
      {
        path: 'icons',
        name: 'Icons',
        meta: { title: '图标', icon: '' },
        children: [
          {
            path: 'element-plus-icons',
            name: 'ElementPlusIcons',
            component: () => import('@/views/Example/Icons/ElementPlusIcons/ElementPlusIcons.vue'),
            meta: { title: 'ElementPlusIcons', icon: 'ElementPlus' },
          },
          {
            path: 'svg-icons',
            name: 'SvgIcons',
            component: () => import('@/views/Example/Icons/SvgIcons/SvgIcons.vue'),
            meta: { title: 'SvgIcons', icon: '' },
          },
        ],
      },
      {
        path: 'table',
        meta: { title: '表格', icon: 'Folder' },
        children: [
          {
            path: 'table-a',
            name: 'TableA',
            component: () => import('@/views/Example/Table/TableA/TableA.vue'),
            meta: { title: 'TableA', icon: 'List' },
          },
          {
            path: 'table-b',
            name: 'TableB',
            component: () => import('@/views/Example/Table/TableB/TableB.vue'),
            meta: { title: 'TableB', icon: 'List' },
          },
          {
            path: 'table-c',
            name: 'TableC',
            component: () => import('@/views/Example/Table/TableC/TableC.vue'),
            meta: { title: 'TableC', icon: 'List', hidden: true },
          },
        ],
      },
      {
        path: 'external-links',
        meta: { title: '外链', icon: 'Link' },
        children: [
          {
            path: 'https://element-plus.org/zh-CN/',
            meta: { title: 'Element Plus', icon: 'ElementPlus', link: 'https://element-plus.org/zh-CN/' },
          },
          {
            path: 'https://element.eleme.cn/#/zh-CN',
            meta: { title: 'Element UI', icon: 'Eleme', link: 'https://element.eleme.cn/#/zh-CN' },
          },
          {
            path: 'https://www.google.cn/chrome/',
            meta: { title: 'Chrome', icon: 'ChromeFilled', link: 'https://www.google.cn/chrome/' },
          },
          {
            path: 'https://gitee.com/madt/vue3-admin',
            meta: { title: 'Gitee 仓库', icon: '', link: 'https://gitee.com/madt/vue3-admin' },
          },
          {
            path: 'https://github.com/mayi00/vue3-admin',
            meta: { title: 'GitHub 仓库', icon: '', link: 'https://github.com/mayi00/vue3-admin' },
          },
          {
            path: 'https://mayi00.github.io/vue3-admin',
            meta: { title: 'Vue3-admin', icon: '', link: 'https://mayi00.github.io/vue3-admin' },
          },
        ],
      },
      {
        path: 'ext-links',
        meta: { title: '外链（内嵌访问）', icon: 'Link' },
        children: [
          {
            path: 'element-plus',
            name: 'ElementPlus',
            component: () => import('@/views/Example/ExtLinks/ExtLinks.vue'),
            meta: {
              title: 'Element Plus',
              icon: 'ElementPlus',
              link: 'https://element-plus.org/zh-CN/',
              embeddedAccess: true,
            },
          },
          {
            path: 'element-ui',
            name: 'Element',
            component: () => import('@/views/Example/ExtLinks/ExtLinks.vue'),
            meta: {
              title: 'Element UI',
              icon: 'Eleme',
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
              icon: 'ChromeFilled',
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
              icon: '',
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
              icon: '',
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
