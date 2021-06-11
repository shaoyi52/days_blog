# React 的 React.FC

> React 的组件可以定义为 函数（React.FC<>）或 class（继承 React.Component） 的形式。

## 一、React.FC<>

1. React.FC 是函数式组件，是在 TypeScript 使用的一个泛型，FC 就是 FunctionComponent 的缩写，事实上 React.FC 可以写成 React.FunctionComponent：

```
const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert message={content} type="error" showIcon />
);
```

2. React.FC 包含了 PropsWithChildren 的泛型，不用显式的声明 props.children 的类型。React.FC<> 对于返回类型是显式的，而普通函数版本是隐式的（否则需要附加注释）。
3. React.FC 提供了类型检查和自动完成的静态属性：displayName，propTypes 和 defaultProps（注意：defaultProps 与 React.FC 结合使用会存在一些问题）
4. 我们使用 React.FC 来写 React 组件的时候，是不能用 setState 的，取而代之的是 useState()、useEffect 等 Hook API。

## 二、 class xx extends React.Component

如需定义 class 组件，需要继承 React.Component。React.Component 是类组件，在 TypeScript 中，React.Component 是通用类型（aka React.Component<PropType, StateType>），因此要为其提供（可选）prop 和 state 类型参数：
