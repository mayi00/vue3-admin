import Layout from '@/layout/Layout.vue'

export const exampleRoutes = [
  {
    path: '/example',
    component: Layout,
    meta: { title: '示例', icon: '' },
    children: [
      {
        path: 'rich-text',
        name: 'RichText',
        meta: { title: '富文本', icon: 'form' },
        children: [
          {
            path: 'vue-quill-editor',
            name: 'VueQuillEditor',
            component: () => import('@/views/Example/RichText/VueQuillEditor/VueQuillEditor.vue'),
            meta: { title: 'VueQuillEditor', icon: 'form' },
          },
          {
            path: 'wang-editor',
            name: 'WangEditor',
            component: () => import('@/views/Example/RichText/WangEditor/WangEditor.vue'),
            meta: { title: 'WangEditor', icon: 'form' },
          },
        ],
      },
      {
        path: 'table',
        meta: { title: '表格', icon: '' },
        children: [
          {
            path: 'table-a',
            name: 'TableA',
            component: () => import('@/views/Example/Table/TableA/TableA.vue'),
            meta: { title: 'tableA', icon: '' },
          },
          {
            path: 'table-b',
            name: 'TableB',
            component: () => import('@/views/Example/Table/TableB/TableB.vue'),
            meta: { title: 'tableB', icon: '' },
          },
        ],
      },
      {
        path: 'student-class-hours',
        name: 'StudentClassHours',
        component: () => import('@/views/Example/StudentClassHours/StudentClassHours.vue'),
        meta: { title: '学生课时', icon: '' },
      },
      {
        path: 'external-links',
        meta: { title: '外链' },
        children: [
          {
            path: 'https://gitee.com/madt/vue3-admin',
            name: 'Gitee',
            meta: { title: 'Gitee 仓库', icon: 'form', link: 'https://gitee.com/madt/vue3-admin' },
          },
          {
            path: 'https://github.com/mayi00/vue3-admin',
            name: 'GitHub',
            meta: { title: 'GitHub 仓库', icon: 'form', link: 'https://github.com/mayi00/vue3-admin' },
          },
          {
            path: 'https://mayi00.github.io/vue3-admin',
            name: 'OnlinePreview',
            meta: { title: '在线预览', icon: 'form', link: 'https://mayi00.github.io/vue3-admin' },
          },
        ],
      },
      {
        path: 'ext-links',
        meta: { title: '外链（内嵌访问）' },
        children: [
          {
            path: 'gitee',
            name: 'Gitee',
            component: () => import('@/views/Example/ExtLinks/ExtLinks.vue'),
            meta: {
              title: 'Gitee 仓库',
              icon: 'form',
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
              icon: 'form',
              link: 'https://github.com/mayi00/vue3-admin',
              embeddedAccess: true,
            },
          },
          {
            path: 'online-preview',
            name: 'OnlinePreview',
            component: () => import('@/views/Example/ExtLinks/ExtLinks.vue'),
            meta: {
              title: '在线预览',
              icon: 'form',
              link: 'https://mayi00.github.io/vue3-admin',
              embeddedAccess: true,
            },
          },
        ],
      },
    ],
  },
]
