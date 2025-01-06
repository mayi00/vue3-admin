import globals from 'globals'
import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'
import * as parserVue from 'vue-eslint-parser'

export default [
  {
    ...js.configs.recommended,
    ignores: ['node_modules', 'dist', 'public', 'src/assets/**'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    plugins: {
      prettier: pluginPrettier
    },
    rules: {
      ...configPrettier.rules,
      ...pluginPrettier.configs.recommended.rules,
      'prettier/prettier': [1],
      // 文件末尾加一个空行
      'eol-last': 1,
      // 缩进风格，使用2个空格
      indent: [1, 2, { SwitchCase: 1 }],
      // 对象字面量中冒号的前后空格
      'key-spacing': [1, { beforeColon: false, afterColon: true }],
      // 行的最大长度
      'max-len': [0, { code: 120, tabWidth: 2 }],
      // 禁止 debugger
      'no-debugger': 1,
      // 禁止不必要的 Boolean 转换
      'no-extra-boolean-cast': 1,
      // 禁止非必要的括号
      'no-extra-parens': [1, 'functions'],
      // 禁止省略浮点数中的0 .5 3.
      'no-floating-decimal': 2,
      // 禁止混用空格和 tab
      'no-mixed-spaces-and-tabs': [1, false],
      // 禁止嵌套三元表达式
      'no-nested-ternary': 1,
      // 禁止给参数重新赋值
      'no-param-reassign': 1,
      // 禁止重复声明变量
      'no-redeclare': 2,
      // 禁止使用关键字作为变量名
      'no-shadow-restricted-names': 2,
      // 禁止出现未定义的变量
      'no-undef': 1,
      // 禁止出现声明后未被使用的变量或参数
      'no-unused-vars': 1,
      // 首选const
      'prefer-const': 1,
      // 首选模板字符串，而不是字符串拼接
      'prefer-template': 1,
      // 引号类型 `` "" ''
      quotes: [1, 'single', { avoidEscape: true }],
      // 语句强制分号结尾
      semi: [1, 'never'],
      // 注释的 * 或 // 后要有一个空格
      'spaced-comment': [1, 'always']
    }
  },

  // Vue 文件配置
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: parserVue,
      parserOptions: {
        sourceType: 'module'
      }
    },
    plugins: {
      vue: pluginVue
    },
    processor: pluginVue.processors['.vue'],
    rules: {
      ...pluginVue.configs['vue3-essential'].rules,
      ...pluginVue.configs['vue3-recommended'].rules,

      // 关闭组件名称多词要求
      'vue/multi-word-component-names': 0,
      // 允许 v-html
      'vue/no-v-html': 0
    }
  }
]
