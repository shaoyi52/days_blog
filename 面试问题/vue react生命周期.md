# 生命周期详解

> create by **yuzhoufen** on **2021-08-06 17:20**

## react 生命周期三阶段

Mounting（创建阶段）
Updating（更新阶段）
Unmounting（卸载阶段）

componentWillMount（17 版本中去掉）
componentWillRecieveProps（17 版本中去掉）
componentWIllUpdate（17 版本中去掉）

新增生命周期
getDerivedStateFromProps(nextProps, prevState)
getSnapshotBeforeUpdate(prevProps, prevState)

componentDidCatch(error, info)
任何一处的 javascript 报错会触发 类似于 JS 原生的 try/catch。可以捕获错误，并处理

1. 挂载

- getDefaultProps <a herf="#01">示例</a>
- getInitialState <a name="getInitialState">示例 </a>
- 1.1. constructor()
- 1.2. componentWillMount()
- 1.3. componentDidMount()

2. 更新过程

- 2.1. componentWillReceiveProps(nextProps)
- 2.2. shouldComponentUpdate(nextProps,nextState)
- 2.3. componentWillUpdate(nextProps,nextState)
- 2.4. componentDidUpdate(prevProps,prevState)
- 2.5. render()

3.

### react 示例

#### getDefaultProps

对于每个组件实例来讲，这个方法只会调用一次，该组件类的所有后续应用，getDefaultPops 将不会再被调用，其返回的对象可以用于设置默认的 props(properties 的缩写) 值

```
Hello = React.creatClass({
    getDefaultProps: function(){
        return {
            name: 'pomy',
            git: 'dwqs'
        }
    },

    render: function(){
        return (
            <div>Hello,{this.props.name},git username is {this.props.dwqs}</div>
        )
    }
});

ReactDOM.render(<Hello />, document.body);
```

##### getInitialState

对于组件的每个实例来说，这个方法的调用有且只有一次，用来初始化每个实例的 state，在这个方法里，可以访问组件的 props。每一个 React 组件都有自己的 state，其与 props 的区别在于 state 只存在组件的内部，props 在所有实例中共享。

getInitialState 和 getDefaultPops 的调用是有区别的，getDefaultPops 是对于组件类来说只调用一次，后续该类的应用都不会被调用，而 getInitialState 是对于每个组件实例来讲都会调用，并且只调一次。

```
var LikeButton = React.createClass({
  getInitialState: function() {
    return {liked: false};
  },
  handleClick: function(event) {
    this.setState({liked: !this.state.liked});
  },
  render: function() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return (
      <p onClick={this.handleClick}>
        You {text} this. Click to toggle.
      </p>
    );
  }
});

ReactDOM.render(
  <LikeButton />,
  document.getElementById('example')
);
```

## vue

### vue2 生命周期三阶段

1. 挂载 ** beforeCreate、created、beforeMount、mounted **
2. 更新 \*\* beforeUpdate、updated
3. 销毁 \*\* beforeDestoryed、destroyed
