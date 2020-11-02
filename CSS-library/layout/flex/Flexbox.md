# CSS Flexbox 弹性布局

> create by **yuzhoufen** on **2020-07-06 15:45**

## 容器的属性

- display: flex
- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-content

## 项目属性

- order
- flex-grow
- flex-shrink
- flex-basis
- flex
- align-self

### 容器的属性解释

1. flex-direction：row|row-reverse|column|column-reverse

2. flex-wrap:nowrap|wrap|wrap-reverse

3. flex-flow：[row nowrap]

4. justify-content:flex-start|flex-end|center|space-between|space-around

5. align-items:flex-start|flex-end|center|baseline|stretch

6. align-content 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

```
.box{align-content:flex-start|flex-end|center|space-between|space-around|stretch;}
```

## Demo 示例

[练习地址](https://www.freecodecamp.org/learn/responsive-web-design/css-flexbox/use-display-flex-to-position-two-boxes)

1. demo1 【align-centent】 多行才使用到

```
<style>

#father{

    width:200px;
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    align-content:center;
    height:200px;
    background-color:grey;
}
.son1{

    height:30px;
    width:100px;
    background-color:orange;
}

.son2{

    height:30px;
    width:100px;
    background-color:red;
}

.son3{

    height:30px;
    width:100px;
    background-color:#08a9b5;
}


</style>
<div id="father">
    <div class="son1">q</div>
    <div class="son2">w</div>
    <div class="son3">e</div>
    <div class="son3">e</div>
    <div class="son3">e</div>
</div>
```
