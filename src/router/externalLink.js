export const routes = [
  {
    path: '/externalLink',
    name: 'ExternalLink',
    meta: { title: '外链' },
    children: [
      {
        name: 'Gitee',
        path: 'https://gitee.com/madt/vue3-admin',
        meta: { title: 'Gitee 仓库', icon: 'form', link: 'https://gitee.com/madt/vue3-admin' },
      },
      {
        name: 'GitHub',
        path: 'https://github.com/mayi00/vue3-admin',
        meta: { title: 'GitHub 仓库', icon: 'form', link: 'https://github.com/mayi00/vue3-admin' },
      },
      {
        name: 'OnlinePreview',
        path: 'https://mayi00.github.io/vue3-admin',
        meta: { title: '在线预览', icon: 'form', link: 'https://mayi00.github.io/vue3-admin' },
      },
    ],
  },
]
