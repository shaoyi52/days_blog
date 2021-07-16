# Hooks 实例及概念

> hooks 是 React 16.8 更新的部分特性，让你的函数组件可以做类组件能做的事情

## **React Hooks 被开发出来主要是这三个理由：**

- 难以复用类组件之间的逻辑
- 生命周期中经常包含一些莫名其妙的不相关逻辑
- 类组件难以被机器和人理解

## hooks 接口(共 10 个)

- useCallback;
- useContext;
- useDebugValue;
- useEffect;
- useImperativeHandle;
- useLayoutEffect;
- useMemo;
- useReducer;
- useRef;
- useState;

## 参考资料

[hooks 官方文档](https://reactjs.org/docs/hooks-intro.html)

[Alibaba Hook 库文档](https://ahooks.js.org/zh-CN)

[Alibaba Hook github 库](https://github.com/alibaba/hooks/blob/master/packages/hooks/src)

# Rules of Hooks

## 只可以在顶层调用 Hook

- Only call Hooks at the top level. Don’t call Hooks inside loops, conditions, or nested functions.

## 只从 React Functions 调用 Hooks(不要从常规 JavaScript 函数中调用 Hook)

- Only call Hooks from React function components. Don’t call Hooks from regular JavaScript functions. (There is just one other valid place to call Hooks — your own custom Hooks. We’ll learn about them in a moment.)

1. 从 React 函数组件调用 Hooks。
2. 从自定义 Hooks 调用 Hooks

# State Hook

## Declaring a state variables

```
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );

```

## Declaring multiple state variables

```
function ExampleWithManyStates() {
  // Declare multiple state variables!
  const [age, setAge] = useState(42);
  const [fruit, setFruit] = useState('banana');
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
  // ...
}

```

# Effect Hook

默认情况下，它在第一次渲染之后和每次更新之后都运行;当你调用 useEffect 时，就是在告诉 React 在完成对 DOM 的更改后运行你的“副作用”函数

1. Effect 的可选清除机制
2. Effects 优化性能

##

```
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Effect 的可选清除机制---(return 一个方法)

```
function FriendStatus(props) {
  // ...
  useEffect(() => {
    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```

## Effects 优化性能

```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, []); // Only re-run the effect once
```

```
useEffect(() => {
  document.title = `You clicked ${count} times`;
}, [count]); // Only re-run the effect if count changes
```

# useMemo 和 useCallback 就是解决性能问题

useMemo 和 useCallback 都会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行；并且这两个 hooks 都返回缓存的值，useMemo 返回缓存的变量，useCallback 返回缓存的函数

## useMemo 示例

```
export default function WithMemo() {
    const [count, setCount] = useState(1);
    const [val, setValue] = useState('');
    const expensive = useMemo(() => {
        console.log('compute');
        let sum = 0;
        for (let i = 0; i < count * 100; i++) {
            sum += i;
        }
        return sum;
    }, [count]);

    return <div>
        <h4>{count}-{expensive}</h4>
        {val}
        <div>
            <button onClick={() => setCount(count + 1)}>+c1</button>
            <input value={val} onChange={event => setValue(event.target.value)}/>
        </div>
    </div>;
}

```

上面使用 useMemo 来执行昂贵的计算，然后将计算值返回，并且将 count 作为依赖值传递进去。这样，就只会在 count 改变的时候触发 expensive 执行，在修改 val 的时候，返回上一次缓存的值。

## useCallback 示例

- 问题引发

1. 子组件 onChange 调用了父组件的 handleOnChange
2. 父组件 handleOnChange 内部会执行 setText(e.target.value)引起父组件更新
3. 父组件更新会得到新的 handleOnChange，传递给子组件，对于子组件来说接收到一个新的 props
4. 子组件进行不必要更新

```
import React, { useState, memo, useMemo, useCallback } from 'react'

const Child = memo((props) => {
  console.log(props);

  return (
    <div>
      <input type="text" onChange={props.onChange}/>
    </div>
  )
})

const Parent = () => {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('')

  const handleOnChange = useCallback((e) => {
    setText(e.target.value)
  },[])

  return (
    <div>
      <div>count: {count}</div>
      <div>text: {text}</div>
      <button onClick={() => {
        setCount(count + 1)
      }}>+1</button>
      <Child onChange={handleOnChange} />
    </div>
  )
}

function App() {
  return <div><Parent /></div>
}

export default App
```

- 上例解析

1. handleOnChange 被缓存了下来，尽管父组件更新了，但是拿到的 handleOnChange 还是同一个
2. 对比 useMemo，useMemo 缓存的是一个值，useCallback 缓存的是一个函数，是对一个单独的 props 值进行缓存
3. memo 缓存的是组件本身，是站在全局的角度进行优化

# useRef Hook

## 特点

1. useRef 是一个方法，且 useRef 返回一个可变的 ref 对象（对象！！！）
2. initialValue 被赋值给其返回值的.current 对象
3. 可以保存任何类型的值:dom、对象等任何可变值
4. ref 对象与自建一个{current：‘’}对象的区别是：useRef 会在每次渲染时返回同一个 ref 对象，即返回的 ref 对象在组件的整个生命周期内保持不变。自建对象每次渲染时都建立一个新的。
5. **ref 对象的值发生改变之后，不会触发组件重新渲染**。有一个窍门，把它的改边动作放到 useState()之前。
   本质上，useRef 就是一个其.current 属性保存着一个可变值“盒子”
6. 想要在 React 绑定或解绑 DOM 节点的 ref 时运行某些代码，则需要使用回调 ref 来实现。

### 常用示例

1. 命令式地访问子组件

```
function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

2. **转发 refs 到 DOM 组件**（ref 不像 props 作为参数可以传递，所以要想传递 ref 得用 forwardRef）

```
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// You can now get a ref directly to the DOM button:
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;

```

3. useImperativeHandle

```
import {  useRef,forwardRef,MutableRefObject,useImperativeHandle,Ref} from "react";

//只暴露value、getType、focus给父级
const InputEl = forwardRef((props: {}, ref: Ref<any>): JSX.Element=>{
    const inputEl: MutableRefObject<any> = useRef();

    useImperativeHandle(ref, ()=>({//第一个参数：暴露哪个ref；第二个参数：暴露什么
        value: (inputEl.current as HTMLInputElement).value,
        getType: () => (inputEl.current as HTMLInputElement).type,
        focus: () => (inputEl.current as HTMLInputElement).focus()
    }));

    return(
        <input ref={inputEl} type="text" {...props}/>
    )
})
//暴露整个input节点给父级
const InputEl = forwardRef((props: {}, ref: Ref<any>): JSX.Element=>{
    return(
        <input ref={ref} type="text" {...props}/>
    )
});

//父级
function InputWithFocusButton() {
    const inputEl: MutableRefObject<any> = useRef(null);

    function onButtonClick() {
        console.log('子组件input的对象:', inputEl.current);
        inputEl.current.focus();
    };
    return (
        <>
            <InputEl ref={inputEl} />
            <button onClick={onButtonClick}>Focus the input</button>
        </>
    );
}

```

通过 forwardRef，父组件获取子组件的 ref，子组件在暴露 ref 中，限制暴露的一些参数
