module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    process: true,
    __dirname: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    './vite/.eslintrc-auto-import.json',
    'prettier',
    'plugin:prettier/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier'],
  rules: {
    'prettier/prettier': [
      1,
      {
        useTabs: false // 不使用制表符
      }
    ],
    // 在对象和类中使用 getter、setter
    'accessor-pairs': 0,
    // 数组内保持一致的间距，方括号内不加空格
    'array-bracket-spacing': [1, 'never'],
    // 箭头函数参数是否需要小括号
    'arrow-parens': [1, 'as-needed'],
    // 箭头函数的 => 的前/后括号
    'arrow-spacing': 1,
    // 在定义的范围内强制使用变量
    'block-scoped-var': 1,
    // 大括号内要加空格
    'block-spacing': [2, 'always'],
    // 大括号风格
    'brace-style': [1, '1tbs'],
    // 强制驼峰命名
    camelcase: 0,
    // 对象字面量项尾不能有逗号
    'comma-dangle': [2, 'never'],
    // 逗号前后的空格
    'comma-spacing': [1, { before: false, after: true }],
    // 逗号风格，换行时在行尾
    'comma-style': [2, 'last'],
    // 一个函数中的复杂度
    complexity: [1, { max: 20 }],
    // 方括号里面不加空格，方括号和属性之间不加空格
    'computed-property-spacing': [2, 'never'],
    // return 后面是否允许省略
    'consistent-return': 0,
    // this 别名
    'consistent-this': [1, 'that'],
    // 在构造函数中需要 siper() 调用
    'constructor-super': 0,
    // 是否必须使用 if () {} 中的 {}
    curly: [1, 'multi-line'],
    // switch 语句最后必须有 default
    'default-case': 1,
    // switch 语句中的 default 子句放在最后
    'default-case-last': 1,
    // 对象访问符的位置，换行的时候在行首还是行尾
    'dot-location': [1, 'property'],
    // 访问属性时使用 foo.bar 而不是 foo['bar']
    'dot-notation': [1, { allowKeywords: true }],
    // 文件末尾加一个空行
    'eol-last': 1,
    // 必须使用 ===、!==
    eqeqeq: 1,
    // 函数和调用的 () 之间的不加空格
    'func-call-spacing': 1,
    // 函数表达式要有名字
    'func-names': [0, 'as-needed'],
    // 函数风格，规定只能使用函数声明/函数表达式
    'func-style': 0,
    // 生成器函数 * 的前后空格
    'generator-star-spacing': [2, { before: true, after: true }],
    // for in 循环要用 if 语句过滤
    'guard-for-in': 0,
    // 变量名长度
    'id-length': 0,
    // 命名检测
    'id-match': 0,
    // 缩进风格，使用2个空格
    indent: [1, 2, { SwitchCase: 1 }],
    // 声明时必须赋初值
    'init-declarations': 0,
    // 对象字面量中冒号的前后空格
    'key-spacing': [1, { beforeColon: false, afterColon: true }],
    // 关键字前后空格，if、switch 等
    'keywords-spacing': [0, { before: false, after: true }],
    // 换行风格
    'linebreak-style': [0, 'windows'],
    // 块注释前需要一个空行
    'lines-around-comment': 0,
    // 行注释的位置，在代码上方
    'line-comment-position': [1, 'above'],
    // 块可嵌套的最大深度
    'max-depth': [0, { max: 4 }],
    // 行的最大长度
    'max-len': [0, { code: 120, tabWidth: 2 }],
    // 回调可嵌套的最大深度
    'max-nested-callbacks': [1, 10],
    // 函数最多只能有3个参数
    'max-params': [0, 3],
    // 函数内最多有几个声明
    'max-statements': [0, 10],
    // 不允许连续的单行注释，允许块注释
    'multiline-comment-style': [1, 'starred-block'],
    // 构造函数名称以大写字母开头
    'new-cap': 0,
    // 调用不带参数的构造函数时（new时）必须加小括号
    'new-parens': 2,
    // 禁止使用 alert confirm prompt
    'no-alert': 1,
    // 禁止使用 new Array()
    'no-array-constructor': 2,
    // 禁止循环内的 await
    'no-await-in-loop': 1,
    // 禁止使用按位运算符
    'no-bitwise': 0,
    // 禁止使用 arguments.caller 或 arguments.callee
    'no-caller': 2,
    // 禁止在 case 子语句中声明
    'no-case-declarations': 2,
    // 禁止给类赋值
    'no-class-assign': 2,
    // 禁止在条件表达式中使用赋值语句
    'no-cond-assign': 2,
    // 禁止使用 console
    'no-console': 0,
    // 禁止修改const声明的变量
    'no-const-assign': 2,
    // 禁止在条件中使用常量表达式，例如：if (true)
    'no-constant-condition': 2,
    // 禁止使用 continue
    'no-continue': 0,
    // 禁止在正则表达式中使用控制字符
    'no-control-regex': 2,
    // 禁止使用 debugger
    'no-debugger': 1,
    // 禁止删除变量
    'no-delete-var': 2,
    // 禁止使用看起来像除法的正则表达式 /=foo/
    'no-div-regex': 1,
    // 禁止函数参数重复
    'no-dupe-args': 2,
    // 禁止 if-else-if 链中的重复条件
    'no-dupe-else-if': 2,
    // 在创建对象字面量时不允许键重复
    'no-dupe-keys': 2,
    // switch 中的 case 标签不能重复
    'no-duplicate-case': 2,
    // 如果 if 语句里面有 return ，后面不能跟 else 语句
    'no-else-return': 0,
    // 禁止空的块语句
    'no-empty': 1,
    // 正则表达式中的 [] 内容不能为空
    'no-empty-character-class': 2,
    // 禁止空函数
    'no-empty-function': 0,
    // 禁止对 null 使用 == 或 != 比较
    'no-eq-null': 1,
    // 禁止使用 eval
    'no-eval': 1,
    // 禁止给 catch 语句中的异常参数赋值
    'no-ex-assign': 2,
    // 禁止扩展 native 对象
    'no-extend-native': 2,
    // 禁止 .bind() 的不必要调用
    'no-extra-bind': 2,
    // 禁止不必要的 Boolean 转换
    'no-extra-boolean-cast': 1,
    // 禁止非必要的括号
    'no-extra-parens': [1, 'functions'],
    // 禁止不必要的分号
    'no-extra-semi': 1,
    // 禁止 switch 穿透
    'no-fallthrough': 1,
    // 禁止省略浮点数中的0 .5 3.
    'no-floating-decimal': 2,
    // 禁止重复的函数声明
    'no-func-assign': 2,
    // 禁止隐式转换
    'no-implicit-coercion': 1,
    // 禁止类似 eval() 的方法
    'no-implied-eval': 2,
    // 禁止行内注释
    'no-inline-comments': 1,
    // 禁止在块语句中使用声明（变量或函数）
    'no-inner-declarations': [2, 'functions'],
    // 禁止无效的正则表达式
    'no-invalid-regexp': 2,
    // 禁止无效的 this，只能用在构造器，类，对象字面量
    'no-invalid-this': 1,
    // 禁止不规则空格
    'no-irregular-whitespace': 2,
    // 禁止使用 __iterator__ 属性
    'no-iterator': 2,
    // label名不能与var声明的变量名相同
    'no-label-var': 2,
    // 禁止标签声明
    'no-labels': 2,
    // 禁止不必要的嵌套块
    'no-lone-blocks': 2,
    // 禁止 else 语句内只有 if 语句
    'no-lonely-if': 1,
    // 禁止在循环中使用函数（如果没有引用外部变量不形成闭包就可以）
    'no-loop-func': 1,
    // 禁止混用空格和 tab
    'no-mixed-spaces-and-tabs': [1, false],
    // 禁止多余的空格
    'no-multi-spaces': 0,
    // 禁止多行字符串
    'no-multi-str': 2,
    // 禁止多个空行，最多2行，文件末尾只允许空一行，文件开头不要空行
    'no-multiple-empty-lines': [1, { max: 2, maxEOF: 1, maxBOF: 0 }],
    // 禁止嵌套三元表达式
    'no-nested-ternary': 1,
    // 禁止在使用new构造一个实例后不赋值
    'no-new': 1,
    // 禁止使用 new Function()
    'no-new-func': 2,
    // 禁止使用 new Object()
    'no-new-object': 2,
    // 禁止使用 new String、new Boolean、new Number
    'no-new-wrappers': 2,
    // 禁止调用内置的全局对象，比如：Math() JSON()
    'no-obj-calls': 2,
    // 禁止使用八进制数字
    'no-octal': 2,
    // 禁止使用八进制转义序列
    'no-octal-escape': 2,
    // 禁止给参数重新赋值
    'no-param-reassign': 1,
    // 禁止使用 ++，--
    'no-plusplus': 0,
    // 禁止使用 __proto__ 属性
    'no-proto': 2,
    // 禁止重复声明变量
    'no-redeclare': 2,
    // 禁止在正则表达式字中使用多个空格 /foo  bar/
    'no-regex-spaces': 2,
    // return 语句中不能有赋值运算符
    'no-return-assign': 1,
    // 禁止使用 javascript:void(0)
    'no-script-url': 1,
    // 禁止比较自身
    'no-self-compare': 2,
    // 禁止使用逗号运算符
    'no-sequences': 1,
    // 禁止在一个作用域中声明和外部作用域同名的变量或参数
    'no-shadow': 0,
    // 禁止使用关键字作为变量名
    'no-shadow-restricted-names': 2,
    // 禁止稀疏数组，例如：[1, , , , 2]
    'no-sparse-arrays': 1,
    // 禁止使用 tab
    'no-tabs': 1,
    // 禁止三元运算符
    'no-ternary': 0,
    // 在调用 super() 之前不能使用 this 或 super
    'no-this-before-super': 0,
    // 禁止抛出字面量错误，例如：throw "error"
    'no-throw-literal': 2,
    // 禁止在行尾有空格
    'no-trailing-spaces': 1,
    // 禁止出现未定义的变量
    'no-undef': 1,
    // 禁止变量初始化时赋值为 undefined
    'no-undef-init': 2,
    // 禁止使用 undefined 作为标识符
    'no-undefined': 1,
    // 禁止混淆多行表达式
    'no-unexpected-multiline': 2,
    // 禁止使用 _ 开头或结尾命名
    'no-underscore-dangle': 0,
    // 禁止不必要的三元表达式嵌套，例如：const isYes = answer === 1 ? true : false
    'no-unneeded-ternary': 1,
    // 禁止出现不能执行的代码
    'no-unreachable': 1,
    // 禁止未使用的表达式
    'no-unused-expressions': 1,
    // 禁止出现声明后未被使用的变量或参数
    'no-unused-vars': [1, { vars: 'all', args: 'after-used' }],
    // 禁止在未定义前使用
    'no-use-before-define': [1, 'nofunc'],
    // 禁止不必要的 .call() 和 .apply()
    'no-useless-call': 1,
    // 禁止不必要的转义符
    'no-useless-escape': 1,
    // 禁用 var，使用 let、const
    'no-var': 1,
    // 禁用 void 操作符
    'no-void': 2,
    // 禁止出现警告类的备注
    'no-warning-comments': [1, { terms: ['todo', 'fixme', 'xxx'], location: 'start' }],
    // 禁用 with
    'no-with': 2,
    // 大括号内保持相同的间距，大括号内要加空格
    'object-curly-spacing': [1, 'always'],
    // 强制对象字面量缩写语法
    'object-shorthand': 0,
    // 强制变量在函数中一起或单独声明
    'one-var': 0,
    // 要求或禁止赋值运算符简写 +=、-=、*= 等
    'operator-assignment': [0, 'always'],
    // 换行时运算符在行尾还是行首
    'operator-linebreak': [1, 'before'],
    // 块语句内行首行尾是否要空行
    'padded-blocks': [1, 'never'],
    // 首选const
    'prefer-const': 1,
    // 首选展开运算符
    'prefer-spread': 0,
    // 首选模板字符串，而不是字符串拼接
    'prefer-template': 1,
    // 引号类型 `` "" ''
    quotes: [1, 'single', { avoidEscape: true }],
    // 对象字面属性名是否强制加上引号
    'quote-props': [1, 'as-needed'],
    // 使用 parseInt() 必须指定第二个参数
    radix: [2, 'as-needed'],
    // 生成器函数必须有 yield
    'require-yield': 0,
    // 语句强制分号结尾
    semi: [1, 'never'],
    // 分号前后空格
    'semi-spacing': [0, { before: false, after: false }],
    // 要求同一个声明块中声明的变量排序
    'sort-vars': [1, { ignoreCase: true }],
    // 不以新行开始的块前面要有空格，大括号前面要有空格
    'space-before-blocks': [1, 'always'],
    // 函数定义时括号前面要不要有空格
    'space-before-function-paren': [1, { anonymous: 'never', named: 'never', asyncArrow: 'always' }],
    // 小括号里面不要有空格
    'space-in-parens': [1, 'never'],
    // 运算符周围要有空格
    'space-infix-ops': 1,
    // 一元运算符的前后要不要加空格
    'space-unary-ops': [0, { words: true, nonwords: false }],
    // 注释的 * 或 // 后要有一个空格
    'spaced-comment': [1, 'always'],
    // 使用严格模式
    strict: 0,
    // 模板字符串的嵌入表达式两边不要空格
    'template-curly-spacing': [1, 'never'],
    // 检查 NaN 时需要调用 isNaN()
    'use-isnan': 2,
    // jsdoc规则
    'valid-jsdoc': 0,
    // 必须使用合法的 typeof 的值
    'valid-typeof': 1,
    // var 必须放在作用域顶部
    'vars-on-top': 1,
    // 立即调用函数需要小括号
    'wrap-iife': [1, 'inside'],
    // 正则表达式字面量用小括号包起来
    'wrap-regex': 0,
    // 禁止尤达条件，即：禁止 if ('red' === color)，允许 if (color === 'red')
    yoda: [1, 'never'],

    /**
     * for vue
     * 以下是针对 vue 相关的校验
     */
    // 组件的 name 使用多个单词组成
    'vue/multi-word-component-names': 0,
    // watch中禁止使用箭头函数
    'vue/no-arrow-functions-in-watch': 0,
    // 计算属性禁止包含异步方法
    'vue/no-async-in-computed-properties': 2,
    // 禁止错误的子节点
    'vue/no-child-content': 2,
    // 数据中无计算属性
    'vue/no-computed-properties-in-data': 2,
    // 禁止二级键名重复
    'vue/no-dupe-keys': 0,
    // v-if/v-else-if 中禁止出现重复条件
    'vue/no-dupe-v-else-if': 2,
    // 禁止出现重复的属性
    'vue/no-duplicate-attributes': 2,
    // <script setup> 中禁止导出
    'vue/no-export-in-script-setup': 1,
    // 禁止对 props 直接进行修改
    'vue/no-mutating-props': 2,
    // 禁止出现语法错误
    'vue/no-parsing-error': 2,
    // ref变量必须通过 .value 的方式读取或修改
    'vue/no-ref-as-operand': 2,
    // 组件名禁止使用保留字
    'vue/no-reserved-component-names': 2,
    // Vue中键名禁止使用Vue的保留字
    'vue/no-reserved-keys': 2,
    // Vue中props禁止使用Vue的保留字
    'vue/no-reserved-props': 2,
    'vue/no-shared-component-data': 2,
    // 禁止在计算属性中修改其他变量或属性
    'vue/no-side-effects-in-computed-properties': 1,
    // 禁止 <template> 添加 key 属性，Vue3可以这么使用，Vue2禁止这样使用
    'vue/no-template-key': 0,
    // 禁止在 <textarea> 中出现 {{ message }}
    'vue/no-textarea-mustache': 2,
    // 禁止有未使用的组件引入
    'vue/no-unused-components': 2,

    // 限制自定义组件的属性风格
    'vue/attribute-hyphenation': 0,
    // html 的结束标签必须符合规定
    'vue/html-end-tags': 0,
    // html 属性值必须用双引号括起来
    'vue/html-quotes': 1,
    // 没有内容时，组件必须自闭和
    'vue/html-self-closing': 0,
    // 定义了的 jsx element 必须使用
    'vue/jsx-uses-vars': 2,
    // 限制每行允许的最多属性数量
    'vue/max-attributes-per-line': 0,
    // 限制组件的 name 属性的值的风格
    'vue/name-property-casing': 0,
    // 禁止出现难以理解的 v-if 和 v-for
    'vue/no-confusing-v-for-v-if': 0,
    // 禁止使用 slot 属性，禁止 slot="xxx"，允许 v-slot:xxx
    'vue/no-deprecated-slot-attribute': 1,
    // 禁止出现连续空格
    'vue/no-multi-spaces': 1,
    // 禁止覆盖保留字
    'vue/no-reservered-keys': 0,
    // 禁止出现声明后未被使用的变量或参数
    'vue/no-unused-vars': 1,
    // 禁止模板中出现无用的属性
    'vue/no-useless-template-attributes': 1,
    'vue/no-v-html': 0,
    // 组件的属性必须为一定的顺序
    'vue/order-in-components': 1,
    // 应该从 vue 导入，实际上配置了 vue API 自动导入后，vue 相关 API 均无需手动导入
    'vue/prefer-import-from-vue': 1,
    // <component> 必须有 v-bind:is
    'vue/require-component-is': 2,
    // props 定义应该是 a: { type: String, default: '' }，而不是 a: String
    'vue/require-prop-type-constructor': 1,
    // prop 必须有类型限制
    'vue/require-prop-types': 1,
    // render 函数必须有返回值
    'vue/require-render-return': 2,
    // prop 的默认值必须匹配它的类型
    'vue/require-valid-default-prop': 1,
    // v-for 指令的元素必须有 v-bind:key
    'vue/require-v-for-key': 1,
    // 计算属性必须有返回值
    'vue/return-in-computed-property': 2,
    // 限制 v-bind 的风格
    'vue/v-bind-style': 0,
    // 限制 v-on 的风格
    'vue/v-on-style': 0,
    // template 的根节点必须合法
    'vue/valid-template-root': 2,
    // v-bind 指令必须合法
    'vue/valid-v-bind': 0,
    // v-cloak 指令必须合法
    'vue/valid-v-cloak': 2,
    // v-else 指令必须合法
    'vue/valid-v-else': 2,
    // v-else-if 指令必须合法
    'vue/valid-v-else-if': 2,
    // v-for 指令必须合法
    'vue/valid-v-for': 1,
    // v-html 指令必须合法
    'vue/valid-v-html': 2,
    // v-if 指令必须合法
    'vue/valid-v-if': 2,
    // v-model 指令必须合法
    'vue/valid-v-model': 2,
    // v-on 指令必须合法
    'vue/valid-v-on': 2,
    // v-once 指令必须合法
    'vue/valid-v-once': 2,
    // v-pre 指令必须合法
    'vue/valid-v-pre': 2,
    // v-show 指令必须合法
    'vue/valid-v-show': 2,
    // v-text 指令必须合法
    'vue/valid-v-text': 2
  }
}
