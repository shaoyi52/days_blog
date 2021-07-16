# TypeScript 基础类型

**参考资料**
[Ts 学习指南](https://juejin.im/post/6872111128135073806#heading-110)

### 2.1 Boolean 类型

```
let isDone: boolan= false
//Es5:var isDone =false;
```

### 2.2 Number 类型

```
let count:number = 10
//Es5:var count = 10
```

### 2.3 String 类型

```
let name: string = "semliker";
//Es5: var name = "semliker"
```

### 2.4 Symbol 类型

```
const sym =Symbol();
let obj={
	[sym]:"semlinker"
}
```

### 2.5 Array 类型

```
let list: number[] = [1,2,3]
// ES5:var list=[1,2,3]
let list: Array<number> =[1,2,3];//Array<number>泛型语法
// ES5:var list=[1,2,3];
```

### 2.6 Enum 类型

使用枚举我们可以定义一些带名字的常量。使用枚举可以清晰地表达意图或创建一组有区别的用例。
TypeScript 支持数字的各基于字符串的枚举。

#### 1. 数字枚举

```
enum Direction{
	NORTH,
	SOUTH,
	EAST,
	WEST
}
let dir:Dirction = Direction.NORTH;
```

### 3.1 react 中常用官方类型

React.reactNode、React.CSSProperties

```
GlobalFooterProps={
    links:string;
    copyright?:React.ReactNode;
    style?:React.CSSProperties;
}
```
