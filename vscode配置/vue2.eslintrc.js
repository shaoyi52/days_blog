const path = require('path');

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: ['plugin:vue/recommended', 'airbnb-base', 'plugin:prettier/recommended'],
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
    babelOptions: {
      babelrc: false,
      configFile: path.join(__dirname, './configs/babel.config.js'),
    },
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['import'],
  rules: {
    'func-names': 0,
    'import/extensions': 0,
    'no-unused-expressions': 0,
    /**
     * 导入语句前不允许有任何非导入语句
     */
    'import/first': 'error',
    /**
     * 禁止重复导入模块
     */
    'import/no-duplicates': 'error',
    /**
     * 禁止使用 let 导出
     */
    'import/no-mutable-exports': 'warn',
    /**
     * 禁用导入的模块时使用 webpack 特有的语法（感叹号）
     */
    'import/no-webpack-loader-syntax': 'warn',
    /**
     * 当只有一个导出时，必须使用 export default 来导出
     */
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
      },
    ],
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'import/no-dynamic-require': 0,
    'global-require': 0,
    /**
     * 不需要commonjs的导入校验
     */
    'import/no-unresolved': [2, { commonjs: false }],
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // eslint-plugin-vue 相关
    'vue/multi-word-component-names': 'off',
    'vue/comment-directive': [
      'error',
      {
        reportUnusedDisableDirectives: true,
      },
    ],
    'vue/padding-line-between-blocks': 'error',
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style'],
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'always',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/component-definition-name-casing': ['error', 'kebab-case'],
  },
};
