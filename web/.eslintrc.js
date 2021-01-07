module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ["plugin:vue/essential", "eslint:recommended"],
  parserOptions: {
    parser: "babel-eslint",
    sourceType: 'module'
  },
  rules: {
    // 等级分为三级： 0-不显示；1-显示警告warning; 2-显示错误error
    ////////////////////
    ///// vue.规范 /////
    ///////////////////
    "vue/max-attributes-per-line": [1, {              //多个特性的元素应该分多行撰写，每个特性一行
      "singleline": 10,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/singleline-html-element-content-newline": 0, // 在单行元素的内容前后需要换行符
    "vue/multiline-html-element-content-newline": 0,  // 在多行元素的内容之前和之后需要换行符
    "vue/name-property-casing": [1, "PascalCase"],    // JS/JSX中的组件名应该始终是帕斯卡命名法
    "vue/no-v-html": 0,
    "vue/prop-name-casing": [1, "camelCase"],         // 在声明prop的时候，其命名应该始终使用驼峰命名
    "vue/require-v-for-key": 2,                       // 给v-for设置键值，与key结合使用，可以高效的更新虚拟DOM
    "vue/no-use-v-if-with-v-for": [2, {
      "allowUsingIterationVar": false
    }],                                               // 不要把 v-if 和 v-for 用在同一个元素上——因为v-for 比 v-if 具有更高的优先级
    "vue/order-in-components": [0, {                  // 组件/实例的选项的顺序
      "order": [
        "el",
        "name",
        "parent",
        "functional",
        ["delimiters", "comments"],
        ["components", "directives", "filters"],
        "extends",
        "mixins",
        "inheritAttrs",
        "model",
        ["props", "propsData"],
        "data",
        "computed",
        "watch",
        "LIFECYCLE_HOOKS",
        "methods",
        ["template", "render"],
        "renderError"
      ]
    }],

    ////////////////////
    ///// js.规范 /////
    ///////////////////
    'accessor-pairs': 2,              // 强制 getter 和 setter 在对象中成对出现
    'arrow-spacing': [2, {            // 在箭头函数之前/之后需要空格
      'before': true,
      'after': true
    }],
    'block-spacing': [2, 'always'],   // 在打开块之后和关闭块之前，禁止或强制执行块内部的空格
    'brace-style': [1, '1tbs', {      // 需要大括号样式
      'allowSingleLine': true
    }],
    'camelcase': [0, {                // 需要驼峰命名
      'properties': 'always'
    }],
    'comma-dangle': 0,     // 要求或禁止使用尾随逗号；最后一个属性是不需要逗号
    'comma-spacing': [2, {            // 强制逗号旁边的间距： 左右一个空格
      'before': false,
      'after': true
    }],
    'comma-style': [2, 'last'],       // 逗号风格
    'constructor-super': 2,           // 构建方法中使用super方法
    'curly': [2, 'multi-line'],
    'dot-location': [1, 'property'],  // 在dot之前和之后强制换行
    'eol-last': 2,                    // 在文件末尾要求或禁止换行
    'eqeqeq': [0, "always", { "null": "ignore" }], // 是否使用全等 
    'generator-star-spacing': [2, {   // 在生成器函数中强制执行*周围的间距
      'before': true,
      'after': true
    }],
    'handle-callback-err': [1, '^(err|error)$'], // 强制执行回调错误处理
    'indent': [2, 2, {                  // 强制执行一致的缩进
      'SwitchCase': 1
    }],
    'jsx-quotes': 2, // 强制在JSX文件中一致使用双引号
    'key-spacing': [2, {                // 在对象属性中强制键和值之间的一致间距
      'beforeColon': false,
      'afterColon': true
    }],
    'keyword-spacing': [2, {            // 关键字前后强制执行一致的间距
      'before': true,
      'after': true
    }],
    'new-cap': [2, {                    // 要求构造函数名称以大写字母开头
      'newIsCap': true,
      'capIsNew': false
    }],
    'new-parens': 2,                    // 调用不带参数的函数时需要括号
    'no-array-constructor': 2,          // 禁止阵列构建器
    'no-caller': 2,                     // 禁止使用来电者/被叫者
    'no-console': 1,                    // 不允许使用控制台
    'no-class-assign': 2,               // 禁止修改类声明的变量
    'no-cond-assign': 2,                // 在条件语句中禁止赋值运算符
    'no-const-assign': 2,               // 禁止修改使用const声明的变量
    'no-control-regex': 0,              // 禁止正则表达式中的控制字符
    'no-delete-var': 2,                 // 禁止删除变量
    'no-dupe-args': 2,                  // 在函数定义中禁止重复参数 
    'no-dupe-class-members': 2,         // 禁止在类成员中重复名称
    'no-dupe-keys': 2,                  // 禁止对象重复声明属性
    'no-duplicate-case': 2,             // 规则禁止重复案例标签
    'no-empty-character-class': 2,      // 禁止在正则表达式中使用空字符类
    'no-empty-pattern': 2,              // 不允许空的解构模式
    'no-eval': 2,                       // 禁止使用eval（）
    'no-ex-assign': 2,                  // 禁止对 catch 子句中的异常重新赋值
    'no-extend-native': 2,              // 禁止扩展原生对象
    'no-extra-bind': 2,                 // 禁止不必要的功能绑定
    'no-extra-boolean-cast': 2,         // 禁止不必要的布尔类型转换
    'no-extra-parens': [2, 'functions'], // 禁止不必要的括号
    'no-fallthrough': 2,                 // 禁止 case 语句落空
    'no-floating-decimal': 2,            // 禁止浮动小数
    'no-func-assign': 2,                 // 禁止重新分配函数声明 
    'no-implied-eval': 2,
    'no-inner-declarations': [2, 'functions'],  // 禁止在嵌套的语句块中出现变量或 function 声明
    'no-invalid-regexp': 2,              // 禁止在RegExp中使用无效的正则表达式字符串
    'no-irregular-whitespace': 2,        // 不允许不规则的空白
    'no-iterator': 2,                    // 禁止迭代器
    'no-label-var': 2,                   // 禁止变量名称的标签
    'no-labels': [2, {
      'allowLoop': false,
      'allowSwitch': false
    }],
    'no-lone-blocks': 2,                 // 禁止不必要的嵌套块
    'no-mixed-spaces-and-tabs': 2,       // 禁止使用混合空格和制表符进行缩进
    'no-multi-spaces': 2,                // 禁止多个空格
    'no-multi-str': 2,                   // 禁止多行字符串
    'no-multiple-empty-lines': [2, {     // 禁止多个空行
      'max': 1
    }],
    'no-global-assign': 2,              //禁止对原生对象或只读的全局对象进行赋值
    'no-unsafe-negation': 2,            //禁止对关系运算符的左操作数使用否定操作符
    'no-new-object': 2,                 //禁止使用 Object 构造函数
    'no-new-require': 2,                //禁止调用 require 时使用 new 操作符
    'no-new-symbol': 2,                 //禁止 Symbolnew 操作符和 new 一起使用
    'no-new-wrappers': 2,               //禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-obj-calls': 2,                  //禁止把全局对象作为函数调用
    'no-octal': 2,                      //禁用八进制字面量
    'no-octal-escape': 2,               //禁止在字符串中使用八进制转义序列
    'no-path-concat': 2,                //禁止对 __dirname 和 __filename 进行字符串连接
    'no-proto': 2,                      //禁用 __proto__ 属性
    'no-redeclare': 2,                  //禁止多次声明同一变量
    'no-regex-spaces': 2,               //禁止正则表达式字面量中出现多个空格
    'no-return-assign': [2, 'except-parens'], //禁止在 return 语句中使用赋值语句 (except-parens 除非使用括号把它们括起来)
    'no-self-assign': 2,                //禁止自身赋值 
    'no-self-compare': 2,               //禁止自身比较
    'no-sequences': 2,                  //不允许使用逗号操作符
    'no-shadow-restricted-names': 2,    //禁止将标识符定义为受限的名字
    'no-spaced-func': 2,                //"never" (默认) 禁止在函数名和开括号之间有空格
    'no-sparse-arrays': 2,              //禁用稀疏数组
    'no-this-before-super': 2,          //禁止在构造函数中，在调用 super() 之前使用 this 或 super
    'no-throw-literal': 2,              //限制可以被抛出的异常 只能用new Errow
    'no-trailing-spaces': 2,            //禁用行尾空白
    'no-undef': 0,
    'no-undef-init': 2,                 //不允许初始化变量值为 undefined
    'no-unexpected-multiline': 2,       //禁止出现令人困惑的多行表达式
    'no-unmodified-loop-condition': 2,  // 禁止未修改的循环条件
    'no-unneeded-ternary': [2, {        // 当存在更简单的替代方案时，不允许三元运算符
      'defaultAssignment': false
    }],
    'no-unreachable': 2,                  // 返回，抛出，继续和中断语句后禁止无法访问的代码
    'no-unsafe-finally': 2,               // 禁止finally块中的控制流语句
    'no-unused-vars': [1, {               // 禁止使用未声明的变量
      'vars': 'all',
      'args': 'none'
    }],
    'no-useless-call': 2,                 // 禁止不必要的call()和apply()方法
    'no-useless-computed-key': 2,         // 禁止在对象上使用不必要的计算属性键
    'no-useless-constructor': 2,          // 禁止不必要的构造方法
    'no-useless-escape': 0,               // 禁止不必要的转义用法
    'no-whitespace-before-property': 2,   // 在属性之前禁止空格
    'no-with': 2,
    'one-var': 0,                         //"always" (默认) 要求每个作用域有一个变量声明
    'operator-linebreak': [2, 'after', {  // 为维护强制执行一致的换行方式 "after" 要求把换行符放在操作符后面
      'overrides': {
        '?': 'before',
        ':': 'before'
      }
    }],
    'padded-blocks': [2, 'never'],         // 在块内要求或禁止填充
    'quotes': 2,
    'semi': [2, 'always'],                  //要求或禁止使用分号代替 ASI
    'semi-spacing': [2, {                  //强制分号前后有空格
      'before': false,
      'after': true
    }],
    'space-before-blocks': [2, 'always'],   // 不要存在多余的块空间  "always"，块语句必须总是至少有一个前置空格
    'space-before-function-paren': [2, 'never'],  //要求或禁止函数圆括号之前有一个空格 never禁止在参数的 ( 前面有空格。
    'space-in-parens': [2, 'never'],              //禁止或强制圆括号内的空格  (默认) 强制圆括号内没有空格
    'space-infix-ops': 2,                         //要求操作符周围有空格
    'space-unary-ops': [2, {                      //要求或禁止在一元操作符之前或之后存在空格                  
      'words': true,                              //words - 适用于单词类一元操作符，例如：new、delete、typeof、void、yield
      'nonwords': false                           //nonwords - 适用于这些一元操作符: -、+、--、++、!、!!
    }],
    'spaced-comment': [2, 'always', {             //要求或禁止在注释前有空白  如果是 "always"，// 或 /* 必须跟随至少一个空白。
      'markers': ['global', 'globals', 'eslint', 'eslint-disable', '*package', '!', ',']
    }],
    'template-curly-spacing': [2, 'never'],        //强制模板字符串中空格的使用  "never" (默认) - 禁止花括号内出现空格。
    'use-isnan': 2,                                //要求使用 isNaN() 检查 NaN
    'valid-typeof': 2,                             //强制 typeof 表达式与有效的字符串进行比较
    'wrap-iife': [2, 'any'],
    'yield-star-spacing': [2, 'both'],
    'yoda': [2, 'never'],
    'prefer-const': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 1,
    'object-curly-spacing': [2, 'always', {        //强制在花括号中使用一致的空格
      objectsInObjects: false
    }],
    'array-bracket-spacing': [2, 'never']          // 禁止或强制在括号内使用空格 "never" (默认) 禁止在数组括号内出现空格
  },
  overrides: [
    {
      files: [
        "**/__tests__/*.{j,t}s?(x)",
        "**/tests/unit/**/*.spec.{j,t}s?(x)"
      ],
      env: {
        jest: true
      }
    }
  ]
};
