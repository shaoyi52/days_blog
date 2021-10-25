# React Api

## React.FC

React.FC 是函数式组件，是在 TypeScript 使用的一个泛型，FC 就是 FunctionComponent 的缩写，事实上 React.FC 可以写成 React.FunctionComponent

```
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert message={content} type="error" showIcon />
);
```

## React.Component

class（继承 React.Component）

```
 class xx extends React.Component{

 }
```

## React.StrictMode

React 严格模式

> StrictMode 是一个用以标记出应用中潜在问题的工具。就像 Fragment ，StrictMode 不会渲染任何真实的 UI。它为其后代元素触发额外的检查和警告。

**StrictMode 的优点：**

- 识别不安全的生命周期组件
- 有关旧式字符串 ref 用法的警告
- 关于使用废弃的 findDOMNode 方法的警告
- 检测意外的副作用
- 检测过时的 context API

**可以在代码的任何地方启用严格模式**

```
// 文件入口
React.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
)

// 单个组件中
import React from "react";

function Home() {
    return (
        <div className="home">
            <React.StrictMode>
                <ComponentTable />
                <ComponentDialog />
            </React.StrictMode>
            <CommonInfo />
        </div>
    )
}
```

## React.Suspense

Suspense 让组件遇到异步操作时进入“悬停”状态，等异步操作有结果时再回归正常状态。
**异步操作简单归为两类：**

1. 异步加载代码
2. 异步加载数据

**异步加载代码**

```
import React, {lazy, Suspense} from 'react';

const OtherComponent = lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent />
    </Suspense>
  );
}

```

**异步加载数据**
