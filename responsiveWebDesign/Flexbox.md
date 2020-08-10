# flex 弹性布局

> 容器框设置 display 为 flex;默认子元素会在行内

```
display:flex;
```

## flex 属性

1. flex-direction：{row|row-reverse|column|column-reverse}
2. justify-content：{flex-start|flex-end|space-between|space-around|space-evenly}
3. align-items:{flex-start|flex-end|center|stretch|baseline}
4. flex-wrap{nowrap|wrap|wrap-reverse}

## flexItem 属性

1. flex-shrink{Number} 收缩比
2. flex-grow{Number} 扩展比
3. flex-basis{100px|100em} //initial size of the item
4. flex: 1 0 10px {flex-grow: 1;, flex-shrink: 0;flex-basis: 10px;}
5. order:{Number}
6. align-self:{flex-start|flex-end|center|stretch|baseline}
