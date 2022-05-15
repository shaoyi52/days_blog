设计模式手册 - Decorator 装饰器模式
==
> create by **yuzhoufen** on **2019-09-18 11:20**
## 概念
Decorator（装饰器模式）属于结构型模式，是一种拓展对象额外功能的设计模式，别名 wrapper
#### 介绍
* **意图**：动态地给一个对象添加一些额外的职责。就增加功能来说，Decorator 模式相比生成子类更为灵活
* **主要解决**：--。
* **何时使用**：--。
* **如何解决**：--。
### 代码示例
 例子使用 typescript

 ```
 class Component {
  // 具有点击事件
  public onClick = () => {}
}

class Decorator extends Component {
  private _component

  constructor(component) {
    this._component = component
  }

  public onClick = () => {
    log('打点')
    this._component.onClick()
  }
}

const component = new Component()
// 一个普通的点击
component.onClick()

const wrapperComponent = new Decorator(component)
// 一个具有打点功能的点击
wrapperComponent.onClick()
 ```
 ### 弊端
 装饰器的问题也是组合的问题，过多的组合会导致：
* 组合过程的复杂，要生成过多的对象。
* 包装器层次增多，会增加调试成本，我们比较难追溯到一个 bug 是在哪一层包装导致的。
 2. 代码练习
* [codepen地址](https://codepen.io/pen/)
* [codesandbox地址](https://codesandbox.io/s/vanilla)
3. 参考相关资料
* [设计模式](https://www.runoob.com/design-pattern/builder-pattern.html)