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
    // 禁止在具有较高优先级的选择器后出现被其覆盖的较低优先级的选择器
    'no-descending-specificity': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ],
    // 允许 global 、export 、deep伪类
    'selector-pseudo-class-no-unknown': [true, { ignorePseudoClasses: ['global', 'export', 'deep'] }],

    // 允许未知属性
    'property-no-unknown': [
      true,
      {
        ignoreProperties: ['backdrop-filter', 'scroll-margin'],
      },
    ],
    //
    'color-hex-length': 'short',
    // 颜色小写
    'color-hex-case': 'lower',
    // 禁止在一个块中出现重复的属性
    'declaration-block-no-duplicate-properties': true,
    // 禁止重复选择器
    'no-duplicate-selectors': true,

    'property-no-vendor-prefix': null,
    // 允许未知规则
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['apply', 'use'],
      },
    ],
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
