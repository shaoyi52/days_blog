## html 标签

> html5标签有：p、a、img、map、area、html、body、br、b、big、em、i、small、strong、sub、sup、ins、del、code、samp、kbd、tt、var、pre、address、bdo、q等

### 基本的 HTML 标签
```
<h1> - <h6> 标签定义 HTML 标题

<p> 标签定义 HTML 段落

<a> 标签定义 HTML 链接

   超链接：

   >通过使用 href 属性 - 创建指向另一个文档的链接

   >通过使用 name 属性 - 创建文档内的书签

   >通过使用 Target 属性，你可以定义被链接的文档在何处显示

   >语法：<a href="url">Link text</a>

   锚点：

   >语法：<a name="label">锚（显示在页面上的文本）</a>

<img> 标签定义 HTML 图像

<map> 定义图像地图

<area>    定义图像地图中的可点击区域

<html>    定义 HTML 文档

<body>    定义文档的主体

<hr /> 标签创建 HTML 页面水平线

 <!-- --> HTML 注释

<br />    插入单个折行（换行）
```

### HTML 文本格式化标签
```
<b> 定义粗体文本

<big> 定义大号字

<em> 定义着重文字

<i> 定义斜体字

<small> 定义小号字

<strong> 定义加重语气

<sub> 定义下标字

<sup> 定义上标字

<ins> 定义插入字

<del> 定义删除字
```

### HTML “计算机输出”标签
```
<code> 定义计算机代码

<kbd> 定义键盘码

<samp> 定义计算机代码样本

<tt> 定义打字机代码

<var> 定义变量

<pre> 定义预格式文本
```
### HTML 引文、引用和定义标签
```
<abbr>    定义缩写或首字母缩略语

<address> 定义文档作者或拥有者的联系信息

<bdo> 定义文本方向

<blockquote>  定义从其他来源引用的节

<dfn> 定义项目或缩略词的定义

<q>   定义短的行内引用

<cite>    定义著作的标题
```

### HTML CSS样式标签
```
<style>   定义样式定义

<link>    定义资源引用

<p>   定义文档中的节或区域（块级）

<span>    定义文档中的行内的小块或区域

<font>    规定文本的字体、字体尺寸、字体颜色。不赞成使用。请使用样式

<center>  对文本进行水平居中。不赞成使用。请使用样式
```
### HTML 表格标签
```
<table> 定义表格

<caption> 定义表格标题

<th>  定义表格的表头

<tr>  定义表格的行

<td>  定义表格单元

<thead>   定义表格的页眉

<tbody>   定义表格的主体

<tfoot>   定义表格的页脚

<col> 定义用于表格列的属性

<colgroup>    定义表格列的组
```
### HTML 分组标签
```
<p>   定义文档中的分区或节（pision/section）。

<span>    定义 span，用来组合文档中的行内元素
```
### HTML 列表
```
<ol>  定义有序列表

<ul>  定义无序列表

<li>  定义列表项

<dl>  定义定义列表

<dt>  定义定义项目

<dd>  定义定义的描述
```

### html5 新增标签
```
<article> 定义文档内的文章。

<aside>   定义页面内容之外的内容。

<bdi> 定义与其他文本不同的文本方向。

<details> 定义用户可查看或隐藏的额外细节。

<dialog>  定义对话框或窗口。

<figcaption>  定义 <figure> 元素的标题。

<figure>  定义自包含内容，比如图示、图表、照片、代码清单等等。

<footer>  定义文档或节的页脚。

<header>  定义文档或节的页眉。

<main>    定义文档的主内容。

<mark>    定义重要或强调的内容。

<menuitem>    定义用户能够从弹出菜单调用的命令/菜单项目。

<meter>   定义已知范围（尺度）内的标量测量。

<nav> 定义文档内的导航链接。

<progress>    定义任务进度。

<rp>  定义在不支持 ruby 注释的浏览器中显示什么。

<rt>  定义关于字符的解释/发音（用于东亚字体）。

<ruby>    定义 ruby 注释（用于东亚字体）。

<section> 定义文档中的节。

<summary> 定义 <details> 元素的可见标题。

<time>    定义日期/时间。

<wbr> 定义可能的折行（line-break）。

<canvas>  定义使用 JavaScript 的图像绘制。

<svg> 定义使用 SVG 的图像绘制。

<audio>   定义声音或音乐内容。

<embed>   定义外部应用程序的容器（比如插件）。

<source>  定义 <video> 和 <audio> 的来源。

<track>   定义 <video> 和 <audio> 的轨道。

<video>   定义视频或影片内容。
```

### HTML 头部元素
```
<head>    定义关于文档的信息

<title>   定义文档标题

<base>    定义页面上所有链接的默认地址或默认目标

<link>    定义文档与外部资源之间的关系

<meta>    定义关于 HTML 文档的元数据

<script>  定义客户端脚本

<style>   定义文档的样式信息
```
### HTML 表单
```
<input> 元素有很多形态，根据不同的 type 属性。

（1）text 定义常规文本输入。

<input type="text"> 定义用于文本输入的单行输入字段。

（2）radio    定义单选按钮输入（选择多个选择之一）。

<input type="radio"> 定义单选按钮。

（3）submit   定义提交按钮（提交表单）。

<input type="submit"> 定义用于向表单处理程序（form-handler）提交表单的按钮。

（4）action 属性定义在提交表单时执行的动作。向服务器提交表单的通常做法是使用提交按钮。通常，表单会被提交到 web 服务器上的网页。

<form action="action_page.php"> 如果省略 action 属性，则 action 会被设置为当前页面。

（5）button属性定义按钮。<input type="button> 

（6）method 属性规定在提交表单时所用的 HTTP 方法（GET 或 POST）：

<form action="action_page.php" method="GET">或：<form action="action_page.php" method="POST">

（7）name规定识别表单的名称（对于 DOM 使用：document.forms.name）。

（8）用 <fieldset> 组合表单数据：<fieldset> 元素组合表单中的相关数据，<legend> 元素为 <fieldset> 元素定义标题。

（9）novalidate 规定浏览器不验证表单。

（10）target规定 action 属性中地址的目标（默认：_self）。

（11）date用于应该包含日期的输入字段<input type="date"> 。month允许用户选择月份和年份<input type="month"> 。week允许用户选择周和年<input type="week"> 。time允许用户选择时间（无时区）<input type="time"> 。datetime允许用户选择日期和时间（有时区）<input type="datetime"> 。datetime-local允许用户选择日期和时间（无时区）<input type="datetime-local"> 。color用于应该包含颜色的输入字段<input type="color"> 。range用于应该包含一定范围内的值的输入字段<input type="range"> 。根据浏览器支持，日期选择器会出现输入字段中。

（12）search 用于搜索字段（搜索字段的表现类似常规文本字段）<input type="search">。tel用于应该包含电话号码的输入字段<input type="tel"> 。url 用于应该包含 URL 地址的输入字段<input type="url">。
```

### HTML Input 属性
1. value 属性：规定输入字段的初始值。

2. readonly 属性：规定输入字段为只读（不能修改），readonly 属性不需要值。它等同于 readonly=“readonly”。

3. disabled 属性：规定输入字段是禁用的，被禁用的元素是不可用和不可点击的，被禁用的元素不会被提交。disabled 属性不需要值。它等同于 disabled=“disabled”。

4. size 属性：规定输入字段的尺寸（以字符计）。

5. maxlength 属性：规定输入字段允许的最大长度。

6. autocomplete 属性：规定表单或输入字段是否应该自动完成。当自动完成开启，浏览器会基于用户之前的输入值自动填写值。

7. novalidate 属性属于< form>属性。如果设置，则 novalidate 规定在提交表单时不对表单数据进行验证。

8. autofocus 属性是布尔属性。如果设置，则规定当页面加载时< input> 元素应该自动获得焦点。

9. form 属性规定< input>元素所属的一个或多个表单。如需引用一个以上的表单，请使用空格分隔的表单 id 列表。

10. ormaction 属性规定当提交表单时处理该输入控件的文件的 URL。formaction 属性覆盖< form>元素的 action 属性。formaction 属性适用于 type=“submit” 以及 type=“image”。

11. formenctype 属性规定当把表单数据（form-data）提交至服务器时如何对其进行编码（仅针对 method=“post” 的表单）。formenctype 属性覆盖 < form>元素的 enctype 属性。formenctype 属性适用于 type=“submit” 以及 type=“image”。

12. formmethod 属性定义用以向 action URL 发送表单数据（form-data）的 HTTP 方法。formmethod 属性覆盖 < form> 元素的 method 属性。formmethod 属性适用于 type=“submit” 以及 type=“image”。

13. novalidate 属性是布尔属性。如果设置，则规定在提交表单时不对< input>元素进行验证。formnovalidate 属性覆盖 < form> 元素的 novalidate 属性。formnovalidate 属性可用于 type=“submit”。

14. formtarget 属性规定的名称或关键词指示提交表单后在何处显示接收到的响应。formtarget 属性会覆盖 < form> 元素的 target 属性。formtarget 属性可与 type=“submit” 和 type=“image” 使用。

15. height 和 width 属性规定 < input> 元素的高度和宽度。height 和 width 属性仅用于 < input type=“image”>。

16. list 属性引用的 < datalist> 元素中包含了 < input> 元素的预定义选项。

17. min 和 max 属性规定 元素的最小值和最大值。min 和 max 属性适用于如需输入类型：number、range、date、datetime、datetime-local、month、time 以及 week。

18. multiple 属性是布尔属性。如果设置，则规定允许用户在 < input> 元素中输入一个以上的值。multiple 属性适用于以下输入类型：email 和 file。

19. pattern 属性规定用于检查 < input> 元素值的正则表达式。pattern 属性适用于以下输入类型：text、search、url、tel、email、and password。

20. placeholder 属性规定用以描述输入字段预期值的提示（样本值或有关格式的简短描述）。该提示会在用户输入值之前显示在输入字段中。placeholder 属性适用于以下输入类型：text、search、url、tel、email 以及 password。

21. required 属性是布尔属性。如果设置，则规定在提交表单之前必须填写输入字段。required 属性适用于以下输入类型：text、search、url、tel、email、password、date pickers、number、checkbox、radio、and file。

22. step 属性规定 元素的合法数字间隔。示例：如果 step=“3”，则合法数字应该是 -3、0、3、6、等等
