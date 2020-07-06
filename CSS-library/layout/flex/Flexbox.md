# CSS Flexbox弹性布局

> create by **yuzhoufen** on **2020-07-06 15:45**

## 容器的属性
- display: flex
- flex-direction
- flex-wrap
- flex-flow
- justify-content
- align-items
- align-conten

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

6. align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
```
.box{align-content:flex-start|flex-end|center|space-between|space-around|stretch;}
```


