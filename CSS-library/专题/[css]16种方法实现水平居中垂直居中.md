# 16 种方法实现水平居中垂直居中

- 水平居中
  1. text-align:center;
  2. margin:0 auto;
  3. width:fit-content;
  4. flex
  5. 盒模型
  6. transform
  7. 绝对居中
- 垂直居中
  1. 单行文本
  2. 行内块级元素, 使用 display: inline-block,vertical-align: middle; 加上伪元素辅助实现
  3. vertical-align
  4. flex
  5. 盒模型
  6. transform
  7. 两种不同的绝对定位方法

## 水平居中

- [x] flex

```
.son{
   display: flex;
   justify-content: center;
}
```

- [x] transform

```
.son{
    position:absolute;
      left:50%;
      transform:translate(-50%,0);
}
```

- [X]　 absolute

```
.son{
    position:absolute;
    width:固定;
    left:50%;
    margin-left:-0.5宽度;
}
```

## 垂直居中

- 行内块级元素

```
.parent::after, .son{
    display:inline-block;
    vertical-align:middle;
}
.parent::after{
    content:'';
    height:100%;
}
```

## 资料来源

[水平居中垂直居中详解](https://juejin.im/post/6844903474879004680)
