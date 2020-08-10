# Grid 网格布局

> 容器框设置 display 为 grid;默认子元素会在行内
> 浏览器支持版 IE 占不支持；Edge_V16 Firefox_v52 Chrome_v57 Safari_v10.1

```
display:flex;
```

## 容器 属性

1. grid-template-columns; fr 等分单位
   repeat(重复 count,[宽度 1 宽度 1 ..])
   minmax()

```
grid-template-columns:100px 100px 100px
grid-template-columns: auto 50px 10% 2fr 1fr;
grid-template-columns: repeat(4, calc((100% - 10px * 3)/ 4))
grid-template-columns: repeat(4, 1fr);
 grid-template-columns: repeat(3, minmax(90px,1fr))
```

2. grid-template-rows

```
grid-template-rows:50px 50px;
```

3. grid-columns-gap

```
grid-template-gap:10px;
```

4. grid-row-gap

```
grid-row-gap:10px;
```

5. grid-gap

```
grid-gap:10px 20px;
```

6. justify-items [stretch|start|center|end] 单元格水平位置
7. align-items [stretch|start|center|end] 单元格垂直位置
8. grid-template-areas //group cells of your grid together into an area and give the area a custom name

## gridItem 属性

1. grid-column 列占比 ;值为网格线；3 列有四个网格线

```
grid-column:2/4
```

2. grid-row 行占比 ;值为网格线；3 行有四个行网格线

```
grid-column:2/4
```

3. justify-self [stretch|start|center|end] 单元格水平位置
4. align-self [stretch|start|center|end] 单元格垂直位置
5. grid-area: horizontal line to start at / vertical line to start at / horizontal line to end at / vertical line to end at
