# 简单编译

**参考资料**
[Ts 学习指南](https://juejin.im/post/6872111128135073806#heading-110)

## 一、TypeScript 是什么

#### 1.1 TypeScript 初体验

新建一个 hello.ts 文件，并输入以下内容：

```
function greet(person: string) {
  return 'Hello, ' + person;
}

console.log(greet("TypeScript"));
```

## 二、TypeScript 基础类型
### 2.1 Boolean 类型 
```
let isDone: boolan= false
//Es5:var isDone =false;
```
### 2.2 Number类型
```
let count:number = 10
//Es5:var count = 10
```
### 2.3 String 类型
```
let name: string = "semliker";
//Es5: var name = "semliker"
```
### 2.4 Symbol类型
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
TypeScript支持数字的各基于字符串的枚举。
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
## 三TypeScript 断言

## 四、类型守卫

## 五、联合类型和类型别名

## 六、交叉类型

## 七、TypeScript 函数

## 八、TypeScript 数组

## 九、TypeScript 对象

## 十、TypeScript 接口

## 十一、TypeScript 类

## 十二、TypeScript 泛型

## 十三、TypeScript 装饰器

## 十四、TypeScript 4.0 新特性

## 十五、编译上下文

## 十六、TypeScript 开发辅助工具
