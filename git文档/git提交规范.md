## Git Commit Message

目前规范使用较多的是 [Angular 团队的规范](https://link.juejin.im/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Fgithub.com%2Fangular%2Fangular.js%2Fblob%2Fmaster%2FDEVELOPERS.md%23-git-commit-guidelines), 继而衍生了 [Conventional Commits specification](https://link.juejin.im/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Fconventionalcommits.org%2F). 很多工具也是基于此规范, 它的 message 格式如下:
```
<type>(<scope>): <subject>
// 空一行
<body>
// 空一行
<footer>
```
完整例子
```
feat:新增自开奖页面

新增活动页面，但是产品还有需求遗漏，待完善
- 新增内容1
- 新增内容2

Closes #123, #245, #992
```
```
fix:活动页面设置渠道后,自动添加渠道文字类型判断错误
```
其中，`Header` 是必填，`Body` 和 `Footer` 是选填。
### `Header`
`Header` 包括三个字段：`type`（必填）、`scope`（选填）和 `subject`（必填）
#### `type`
`type` 用于说明 `commit` 的类别，只允许使用下面 7 个标识。

- feat：新功能（feature）
- fix：修补bug
- docs：文档（documentation）
- style： 格式（不影响代码运行的变动）
- refactor：重构（即不是新增功能，也不是修改bug的代码变动）
- test：增加测试
- chore：构建过程或辅助工具的变动

`type` 为 `feat` 和 `fix`，则该 `commit` 将肯定出现在 `Change log` 之中。
#### `scope`

`scope` 用于说明 `commit` 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

#### `subject`

`subject` 是 `commit` 目的的简短描述，不超过50个字符

```
以动词开头，使用第一人称现在时，比如 change，而不是 changed 或 changes
第一个字母小写
结尾不加句号（.）
```
### `body`

`Body` 部分是对本次 `commit` 的详细描述，可以分成多行。下面是一个范例。

```
More detailed explanatory text, if necessary.  Wrap it to 
about 72 characters or so. 
Further paragraphs come after blank lines.
- Bullet points are okay, too
- Use a hanging indent
```

### `Footer`

`Footer` 部分只用于两种情况

- 不兼容变动

如果当前代码与上一个版本不兼容，则 `Footer` 部分以 `BREAKING CHANGE` 开头，后面是对变动的描述、以及变动理由和迁移方法。

- 关闭 `Issue` 如果当前 `commit` 针对某个 `issue`，那么可以在 `Footer` 部分关闭这个 `issue`

```
Closes #123, #245, #992
```

参考资料

[规范你的 commit message 并且根据 commit 自动生成 CHANGELOG.md](https://juejin.im/post/5bd2debfe51d457abc710b57#heading-12)

[优雅的提交你的 Git Commit Message](https://juejin.im/post/5afc5242f265da0b7f44bee4#heading-3)