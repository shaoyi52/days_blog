# useRef 使用总结

> hooks 是 React 16.8 更新的部分特性，让你的函数组件可以做类组件能做的事情

## **React Hooks 被开发出来主要是这三个理由：**

1. useRef 是一个方法，且 useRef 返回一个可变的 ref 对象（对象！！！）
2. initialValue 被赋值给其返回值的.current 对象
3. 可以保存任何类型的值:dom、对象等任何可辨值
4. ref 对象与自建一个{current：‘’}对象的区别是：useRef 会在每次渲染时返回同一个 ref 对象，即返回的 ref 对象在组件的整个生命周期内保持不变。自建对象每次渲染时都建立一个新的。
5. **ref 对象的值发生改变之后，不会触发组件重新渲染**。有一个窍门，把它的改边动作放到 useState()之前。
   本质上，useRef 就是一个其.current 属性保存着一个可变值“盒子”。

### 参考文档

[useRef 使用总结](https://juejin.cn/post/6844904174417608712)
