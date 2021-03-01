# 接口（interface）和类型别名（type alias）区别

## 定义类型由两种方式：接口（interface）和类型别名（type alias）

interface 只能定义对象类型，
type 声明的方式可以定义组合类型，交叉类型和原始类型
如果用 type alias 声明的方式，会导致一些功能的缺失

1.interface 方式可以实现接口的 extends/implements，而 type 不行
2.interface 可以实现接口的 merge，但是 type 不行

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

## 三、TypeScript 断言

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
