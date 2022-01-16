<!--
 * @Author: yuzhoufen
 * @Date: 2019-12-31 11:14:50
 * @LastEditors: yuzhoufen
 * @LastEditTime: 2021-11-05 12:16:20
 * @Description: Do not edit
 * @FilePath: \my-apph:\gitHub\days_blog\vscode配置\VSCode添加ESLint代码风格检查.md
-->
# VSCode ESLint配置

> 1. 步骤一：
### 一、配置文件格式
ESLint支持多种格式的配置文件：

* JavaScript-使用.eslintrc.js和导出包含您的配置的对象。
* JavaScript的（ESM） -使用.eslintrc.cjsJavaScript中运行包时ESLint指定"type":"module"他们package.json。 请注意，ESLint目前不支持ESM配置。
* YAML-使用.eslintrc.yaml或.eslintrc.yml定义配置结构。
* JSON -使用.eslintrc.json定义配置结构。ESLint的JSON文件还允许使用JavaScript样式的注释。
* 不推荐使用-use.eslintrc，可以是JSON或YAML。
* package.json-eslintConfig在package.json文件中创建一个属性，然后在其中定义配置

**如果同一目录中有多个配置文件，则ESLint将仅使用一个。优先顺序为**
.eslintrc.js
.eslintrc.cjs
.eslintrc.yaml
.eslintrc.yml
.eslintrc.json
.eslintrc
package.json


### 二、 配置项
```
module.exports = {
        env: {
                // 环境
                browser: true,
                es2021: true,
        },
        extends: [
                // 拓展
                'eslint:recommended',
                'plugin:@typescript-eslint/recommended',
        ],
        parser: '@typescript-eslint/parser', // 解析器，本解析器支持Ts
        parserOptions: {
                // 解析器配置选项
                ecmaVersion: 12, // 指定es版本
                sourceType: 'module', // 代码支持es6，使用module
        },
        plugins: [
                // 插件
                '@typescript-eslint',
        ],
        rules: {
                // 规则
        },
};
```
* parser - 解析器
* parserOptions - 解析器选项
* env 和 globals - 环境和全局变量
* rules - 规则
  * off或0，关闭规则
  * warn或1，开启规则
  * error或2，开启规则，并会出错阻止代码运行
* plugins - 插件
* extends - 拓展

### 三、配置优先级

**规则是使用离要检测的文件最近的 .eslintrc文件作为最高优先级。**

1. 行内配置
2. 命令行选项
3. 项目级配置
4. IDE环境配置