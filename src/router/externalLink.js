export const routes = [
  {
    path: '/external-links',
    name: 'ExternalLinks',
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
]
