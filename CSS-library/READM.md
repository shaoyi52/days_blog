CSS 资料室
==
> create by **yuzhoufen** on **2019-08-08 15:45**
* 这里存放CSS相关文章
### 重要规则
1. css命名规范（BEM）
* BEM的意思就是块（block）、元素（element）、修饰符（modifier）,是由Yandex团队提出的一种前端命名方法论
```
.block{}  
.block__element{}  
.block--modifier{}
```
2. css样式的书写顺序及原理
* 定位属性： position  display  float  left  top  right  bottom   overflow  clear   z-index
* 自身属性：width  height  padding  border  margin   background
* 文字样式：font-family   font-size   font-style   font-weight   font-varient   color   
* 文本属性：text-align   vertical-align   text-wrap   text-transform   text-indent    text-decoration   letter-spacing    word-spacing    white-space   text-overflow

* 目的：减少浏览器reflow（回流），提升浏览器渲染dom的性能
* 原理： 浏览器的渲染流程