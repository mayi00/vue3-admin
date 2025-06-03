module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended-less',
    'stylelint-config-standard-vue',
    'stylelint-config-recess-order',
  ],
  plugins: ['stylelint-order', 'stylelint-declaration-block-no-ignored-properties'],
  // 不同格式的文件指定自定义语法
  overrides: [
    {
      files: ['**/*.(less|css|vue|html)'],
      customSyntax: 'postcss-less',
    },
    {
      files: ['**/*.(html|vue)'],
      customSyntax: 'postcss-html',
    },
  ],
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts', '**/*.json', '**/*.md', '**/*.yaml'],
  rules: {
    // 禁止在一个块中出现重复的属性
    'plugin/declaration-block-no-ignored-properties': true,
    // 禁止高优先级选择器后出现低优先级选择器（避免样式覆盖问题）
    'no-descending-specificity': true,
    // 允许使用某些特定伪元素
    'selector-pseudo-element-no-unknown': [true, { ignorePseudoElements: ['v-deep'] }],
    // 允许使用 Vue 中的特殊伪类（如 global, deep, export）
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'export', 'deep'] }],

    // 允许使用尚未完全标准化但常用的属性
    'property-no-unknown': [true, { ignoreProperties: ['backdrop-filter', 'scroll-margin'] }],
    // 十六进制颜色推荐简写
    'color-hex-length': 'short',
    // 防止同一个 CSS 块内重复声明属性
    'declaration-block-no-duplicate-properties': true,
    // 禁止重复选择器
    'no-duplicate-selectors': true,
    // 禁止空的源代码
    'no-empty-source': null,
    // 属性前缀检查
    'property-no-vendor-prefix': null,
    // 允许使用未识别的 @ 规则（如 Tailwind 的 @apply）
    'at-rule-no-unknown': [true, { ignoreAtRules: ['apply', 'use'] }],
    // 关闭类名命名规则检查
    'selector-class-pattern': null,
    // CSS属性排序
    'order/properties-order': [
      // 定位属性
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',

      // 显示模式
      'display',
      'visibility',
      'opacity',

      // 弹性布局
      'flex',
      'flex-direction',
      'flex-wrap',
      'flex-flow',
      'flex-grow',
      'flex-shrink',
      'flex-basis',
      'justify-content',
      'align-items',
      'align-content',
      'align-self',
      'order',
      'gap',

      // 网格布局
      'grid',
      'grid-template',
      'grid-template-areas',
      'grid-template-rows',
      'grid-template-columns',
      'grid-auto-rows',
      'grid-auto-columns',
      'grid-auto-flow',
      'grid-area',
      'grid-row',
      'grid-row-start',
      'grid-row-end',
      'grid-column',
      'grid-column-start',
      'grid-column-end',
      'grid-gap',

      // 盒模型
      'box-sizing',
      'width',
      'min-width',
      'max-width',
      'height',
      'min-height',
      'max-height',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',

      // 视觉样式
      'color',
      'background',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'background-clip',
      'border',
      'border-radius',
      'box-shadow',
      'outline',

      // 文字排版
      'font',
      'font-family',
      'font-size',
      'font-weight',
      'line-height',
      'text-align',
      'text-decoration',
      'text-overflow',
      'white-space',
      'word-break',

      // 动画变换
      'transition',
      'transition-property',
      'transition-duration',
      'transition-timing-function',
      'transition-delay',
      'transform',
      'transform-origin',
      'animation',

      // 现代特性
      'backdrop-filter',
      'aspect-ratio',
      'scroll-margin',
      'scroll-snap-type',
      'overscroll-behavior',
    ],
  },
}
