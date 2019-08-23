CSS 杂未分类
==
> create by **yuzhoufen** on **2019-08-23 16:45**
* css超过一行或者多行后显示省略号
* css图片未知高度垂直居中完美解决方案
* 学习使用:before和:after伪元素
### 重要规则
1. css超过一行显示省略号;代码如下：
```
<p style="width:200px; white-space:nowrap;text-overflow:ellipsis; overflow:hidden">
    BEM的意思就是块（block）、元素（element）、修饰符（modifier）,是由Yandex团队提出的一种前端命名方法论
</p>
```

2. css图片未知高度垂直居中完美解决方案。

该方法的实现方式是将外部容器显示模式设置成display:table;img标签外部再套一个容器，并对该容器设置显示模式为display:table-cell; 类似与表格的显示方式，且不要使用float等属性，但是在IE6、IE7下是不支持的；如下代码：
```
<ul class="list">
    <li>
        <img src="m1.jpg"/>
    </li>
</ul>
<ul class="list">
    <li>
        <img src="m2.jpg"/>
    </li>
<ul>
```
CSS代码如下：
```
<style>
      *{margin:0;padding:0;}
      ul,li{list-style:none;}
      .list {
         float:left;
         margin:20px;
         width:250px;
         height:150px;
         display:table;
         text-align:center;
         border:1px solid #d3d3d3;
      }
      .list li{
         display:table-cell;
         vertical-align:middle;
      }
  </style>
```