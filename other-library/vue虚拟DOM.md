## 虚拟 DOM

---

> create by **yuzhoufen** on **2020-09-03 17:20**

### 1.1 前言

**操作真实 DOM 的代价**

```
let div = document.createElement('div')
  let str = ''
  for (const key in div) {
    str += key + ''
  }
  console.log(str)
```

从打印结果可以看出，一个 dom 会有很多属性；真实的 dom 节点入栈执行会占据很大的内存，当我们频繁的操作会产生性能问题

我们用传统的开发模式，用原生的 js 和 jq 操作 DOM 时，浏览器会从构建 DOM 树到绘制从头到尾执行一遍，如果我们更新 10 个 dom 节点，浏览器收到第一个 dom 请求后并不知道后面还有 9 次更新操作，最终会执行 10 次。如果第一次计算完，紧接这下一个 DOM 更新请求更改了前一次的 DOM；那么前一次的 dom 更新就是白白的性能浪费，虽然计算机硬件一直迭代更新，但是操作 dom 的代价仍然是昂贵的，频繁操作还会出现页面卡顿，影响用户体验。

**为什么虚拟 DOM**

虚拟 dom 就是为了解决浏览器性能问题而设计出来的，如果有 10 次 dom 更新的操作，虚拟 dom 不会立即去操作 dom，而是将这去 10 次更新的 diff 内容保存到本地的一个 js 对象中，最终将这个 js 对象一次性 patch 到 DOM 树上，再进行后续的操作，避免大量无畏的计算量，所以用 js 对象模拟 DOM 节点的好处是页面的更新可以先全部反应到这个 js 对象上，操作 js 对象的速度显然更快，等待更新完成后，在将最终的 js 对象映射真实的 DOM。

**vue 中虚拟 DOM 的表现**

```
// 通过js对象描述的dom结构
   {
       tag: 'div'
       data: {
           id: 'app',
           class: 'main'
       },
       children: [
           {
               tag: 'p',
               text: 'this is test'
           }
       ]
   }

 //最后真实渲染的dom结构
   <div id="app" class="mian">
      <p>this is test</p>
  </div>
```

### 1.2 VNode 类

```
// 源码地址：src/core/vdom/vnode.js
// 通过vNode类，实例化出不同的虚拟DOM节点
export default class VNode {

 constructor (
   tag?: string, // 当前节点标签名
   data?: VNodeData, // // 当前节点的数据对象，也就是标签上的属性；包括attrs,style,hook等具体包含的字段可以参考/types/vnode.d.ts
   children?: ?Array<VNode>, ////数组类型，包含当前节点的子节点
   text?: string, // 当前节点的文本
   elm?: Node,
   context?: Component,
   componentOptions?: VNodeComponentOptions,
   asyncFactory?: Function
 ) {
   this.tag = tag // 当前节点标签名
   this.data = data // 当前节点的数据对象，也就是标签上的属性；包括attrs,style,hook等具体包含的字段可以参考/types/vnode.d.ts
   this.children = children //数组类型，包含当前节点的子节点
   this.text = text // 当前节点的文本
   this.elm = elm // 当前虚拟节点对应的真实的dom节点
   this.ns = undefined // 节点的namespace（命名空间）
   this.context = context // 编译作用域，当前节点对应的vue实例
   this.fnContext = undefined // 函数组件化的作用域，当前组件对应的vue实例
   this.fnOptions = undefined  // 函数式组件Option选项
   this.fnScopeId = undefined
   this.key = data && data.key // 节点的key属性，用作节点的标识，有利于patch优化
   this.componentOptions = componentOptions // 创建组件实例时会用到的选项信息
   this.componentInstance = undefined //当前组件节点对应的vue实例
   this.parent = undefined //组件的占位节点
   this.raw = false // 是否为原生HTML或只是普通文本，innerHTML的时候为true，textContent的时候为false
   this.isStatic = false //静态节点标识
   this.isRootInsert = true // 是否作为根节点插入被<transition>包裹的节点，该属性的值为false
   this.isComment = false //当前节点是否是注释节点
   this.isCloned = false //当前节点是否为克隆节点
   this.isOnce = false // 当前节点是否有v-once指令
   this.asyncFactory = asyncFactory
   this.asyncMeta = undefined
   this.isAsyncPlaceholder = false
 }

 // DEPRECATED:向后兼容组件的别名
 /* istanbul ignore next */
 get child (): Component | void {
   return this.componentInstance
 }
}
```

VNode 类中包含了描述一个真实 dom 节点所需要的一系列属性，通过 VNode 类可以描述各种真实 dom 节点

### 1.3 VNode 类能描述的类型节点

- EmptyVNode: 没有内容的注释节点
- TextVNode: 文本节点
- CloneVNode: 克隆节点，可以是以上任意类型的节点，唯一的区别在于 isCloned 属性为 true
- ComponentVNode: 组件节点
- FunctionalComponent: 函数式组件节点
- ElementVNode: 普通元素节点

1. EmptyVNode（注释节点）

```
// 源码地址：src/core/vdom/vnode.js
// 创建注释节点
export const createEmptyVNode = (text: string = '') => {
 const node = new VNode()
 node.text = text
 node.isComment = true //isComment为true，说明是一个注释节点
 return node
}
```

从上面可以看出注释节点只需 2 个属性，text 表示是注释内容；isComment 表示是否是个注释节点

2. TextVNode（文本节点）

```
// 源码地址：src/core/vdom/vnode.js
// 创建文本节点
export function createTextVNode (val: string | number) {
 return new VNode(undefined, undefined, undefined, String(val))
}
```

文本节点只需传入文本值即可

3. CloneVNode（克隆节点）

```
// 源码地址：src/core/vdom/vnode.js
// 创建克隆节点
export function cloneVNode (vnode: VNode): VNode {
 const cloned = new VNode(
   vnode.tag,
   vnode.data,
   // #7975
   // clone children array to avoid mutating original in case of cloning
   // a child.
   vnode.children && vnode.children.slice(),
   vnode.text,
   vnode.elm,
   vnode.context,
   vnode.componentOptions,
   vnode.asyncFactory
 )
 cloned.ns = vnode.ns
 cloned.isStatic = vnode.isStatic
 cloned.key = vnode.key
 cloned.isComment = vnode.isComment
 cloned.fnContext = vnode.fnContext
 cloned.fnOptions = vnode.fnOptions
 cloned.fnScopeId = vnode.fnScopeId
 cloned.asyncMeta = vnode.asyncMeta
 cloned.isCloned = true
 return cloned
}
```

克隆节点就是把传入的节点的属性全部赋值到新创建的节点上

4. ComponentVNode（组件节点）

源码地址：src/core/vdom/create-component.js

组件节点除了有普通元素节点的属性之外，还有 2 个私有的属性

- componentOptions 创建组件实例时会用到的选项信息
- componentInstance 当前组件节点对应的 vue 实例

5. FunctionalComponent(函数式组件节点)
   源码地址：src/core/vdom/create-functional-component.js

函数式组件 2 个私有的属性

- fnContext 函数组件化的作用域，当前组件对应的 vue 实例
- fnOptions 函数式组件 Option 选项

6. ElementVNode（普通元素节点）

源码地址：src/core/vdom/create-element.js

### 1.4 VNode 类的作用

VNode 类用 js 对象形式描述真实的 dom，在 vue 初始化阶段，我们把 template 模板 vdnode 类实例化成 js 对象并缓存下来，当数据发生变化重新渲染页面的时候，我们把数据发生变化后用 vnode 类实例化的 js 对象与前一次缓存下来描述 dom 节点的 js 对象进行对比，找出差异；然后根据有差异的节点创建出真实的节点插入视图当中

### 1.5 总结

虚拟 dom 就是用以对象的形式去描述真实的 dom,用 js 计算的性能换取操作真实 dom 消耗的性能

## 2.0 diff 算法

### 2.1 前言

上章我们学习了虚拟 dom，知道了渲染真实 dom 的开销很大，如果我们修改了某个数据，如果直接渲染到真实的 dom 上会引起整个 dom 树的重绘和重排； 有没有可能我们只更新修改的那一块 dom，diff 算法能帮到我们，我们先根据真实的 dom 生成一个 virtual DOM 树，当 virtual dom 树的某个节点发生变化后生成一个新的 vnode，然后 Vnode 和 oldVnode 进行对比，一边比较一边给真实 DOM 打补丁，找出差异的过程就是 diff 的过程。

vnode：数据变化后要渲染的虚拟的 dom 节点

oldVnode：数据变化前视图对应的真实的 dom 节点

### 2.2 path

**vue 中把 Diff 过程叫做 patch 过程,patch 的过程就是以新的 Vnode 为基准，去改造旧的 oldNode，让其跟新的一样；有人会说了，直接把旧的替换成新的就行了吗，如果这样做的话就是更新整个视图，而我们现在想做的是哪里变化了更新哪里。**

**举个例子：**现在你手上有个纸板的文档，公司让你做成电子版的；你看了看内容发现好像以前做过，于是你翻了电脑，果不其然上周公司上你做过。你仔细对比一下内容，发现只有某一段的内容不一样，于是在你面前有 2 个办法：1.参考纸版去改老版的。2.在建个文档，把纸版的内容从新输入到电脑。这样一看那肯定是要选择方案 1，而我们的 vue 中也是这样。

#### patch 的过程就是做 3 件事情

- 创建节点：Vnode 里有的，oldNode 没有，那么就在 oldNode 里创建节点
- 删除节点：Vnode 里没有，oldNode 有，那么旧在 oldNode 删除节点
- 更新节点：Vnode 和 oldNode 都有，那么以 Vnode 基准去更新 oldNode

#### 了解一下 oldVnode 有哪些属性

```
<div id="test" class="main"><div>

// 上面节点对应的 oldVnode 就是
{
  elm:  div  //对真实的节点的引用，本例中就是document.querySelector('v#test.main')
  tag: 'DIV',   //节点的标签
  sel: 'div#test.main'  //节点的选择器
  data: null,       // 一个存储节点属性的对象，对应节点的el[prop]属性，例如onclick , style
  children: [], //存储子节点的数组，每个子节点也是vnode结构
  text: null,    //如果是文本节点，对应文本节点，否则为null
}
```

需要注意的是，elm 属性引用的是此 virtual dom 对应的真实 dom，patch 的 vnode 参数的 elm 最初是 null，因为 patch 之前它还没有对应的真实 dom

### 2.3 创建节点

从上章我们知道通过 Vnode 类可以创建 6 种描述的 dom 节点的实例，是实际只有 3 种会被创建，并插入 dom 当中，3 种分别是：元素节点、注释节点、文本节点

```
// 源码位置: /src/core/vdom/patch.js

function createElm (vnode, parentElm, refElm) {
    const data = vnode.data
    const children = vnode.children
    const tag = vnode.tag
    if (isDef(tag)) { //判断是否有tag标签
      vnode.elm = nodeOps.createElement(tag, vnode)   // 创建元素节点
      createChildren(vnode, children, insertedVnodeQueue) // 创建元素节点的子节点
      insert(parentElm, vnode.elm, refElm)       // 插入到DOM中
    } else if (isTrue(vnode.isComment)) {  //判断注释属性是否是true，true的话就是注释节点
      vnode.elm = nodeOps.createComment(vnode.text)  // 创建注释节点
      insert(parentElm, vnode.elm, refElm)           // 插入到DOM中
    } else { // 如果不是元素节点和注释节点，那么就是文本节点
      vnode.elm = nodeOps.createTextNode(vnode.text)  // 创建文本节点
      insert(parentElm, vnode.elm, refElm)           // 插入到DOM中
    }
  }
function isDef (v) {
   return v !== undefined && v !== null
}
```

### 2.4 删除节点

删除节点比较简单，只需调用删除元素的父元素的 removeChild 方法

```
// 源码位置: /src/core/vdom/patch.js
  function removeVnodes (vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      const ch = vnodes[startIdx]
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
        // 存在tag时，说明是元素节点
          removeAndInvokeRemoveHook(ch) // 移除挂载dom上的节点
          invokeDestroyHook(ch) //销毁的钩子
        } else { // Text node
          // 说明是文本节点
          removeNode(ch.elm)
        }
      }
    }
  }
function isDef (v) {
   return v !== undefined && v !== null
}
```

### 2.5 更新节点

更新节点是 vNode 和 oldVnode 都存在时，我们需要细致的找出不同的地方

#### 先了解一下静态节点

```
<div>标题<div>
```

像上面的节点就是静态节点，就是不用变化的节点，没有绑定任何变量，第一次渲染后，以后就不会变化了

#### 这个函数做了一下事情

1. 找到真实的 dom 节点，称之为 elm
2. 判断 vNode 和 oldnode 如果是同一个对象，则直接 return
3. 如果 vNode 和 oldnode 都是静态节点，则直接 return
4. 如果 vnode 没有文本节点
   - 2 者都有子节点且不相同，则执行 updateChildren 比较子节点，比较子节点在下一章介绍。
   - 若只有 vnode 存在子节点，在判断 oldVnode 是否有文本，如果有就清除，然后将 vnode 的子节点替换到真实的 dom 中去
   - 若只有 oldVnode 存在子节点，则清空 dom 种子节点的存在
   - 若 2 者都没有子节点，则 oldnode 种有文本，则清空 oldnode 的文本
5. 如果 vnode 和 oldVnode 都有文本节点且不相同： 则将 elm 的文本节点设置为 vnode 的文本节点(文本节点就是 text 对应的值)

```
// 源码位置: /src/core/vdom/patch.js
  function patchVnode (
    oldVnode,
    vnode,
    insertedVnodeQueue,
    ownerArray,
    index,
    removeOnly
  ) {
    // vnode和oldVnode是完全一样，说明引用一致，没有什么变化；如果是就退出程序
    if (oldVnode === vnode) {
      return
    }

    // 让vnode.elm引用到现在的真实dom上，当elm修改时，vnode.elm会同步变化
    const elm = vnode.elm = oldVnode.elm

    // 如果vnode和oldVnode都是静态节点就退出程序，静态节点，无论数据发生任何变化都与它无关
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance
      return
    }

    const oldCh = oldVnode.children
    const ch = vnode.children

    // vnode如果没有text属性
    if (isUndef(vnode.text)) {
      // 如果vnode的子节点和oldVnode的子节点都存在
      if (isDef(oldCh) && isDef(ch)) {
        //  若都存在且不相同，则更新子节点，这是diff的核心
        if (oldCh !== ch) updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly)
      }
      // 若只有vnode存在子节点
      else if (isDef(ch)) {
        if (process.env.NODE_ENV !== 'production') {
          checkDuplicateKeys(ch)
        }
         // 判断oldVnode是否有文本，如果有则清空dom中的文本，再把vnode的子节点添加到真实的DOM中
        if (isDef(oldVnode.text)) nodeOps.setTextContent(elm, '')
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue)

      }
      // 若只有oldVnode存在子节点
      else if (isDef(oldCh)) {
        // 清空dom中的节点
        removeVnodes(oldCh, 0, oldCh.length - 1)

      }
      // 如果oldVnode和node都没有子节点，但oldVnode有text
      else if (isDef(oldVnode.text)) {
        // 那么清空oldVnode文本
        nodeOps.setTextContent(elm, '')
      }

    // 如果vnode和oldVnode有text属性，但是oldVnode和vnode的text不相同
    } else if (oldVnode.text !== vnode.text) {
      // 不相同则用vnode.text替换真实的dom文本
      nodeOps.setTextContent(elm, vnode.text)
    }

  }
```

### 更新节点流程

### 2.6 diff 的整个流程

#### diff 的比较方式

pach 的过程只会进行同级比较，不会跨级，如果两个子节点一样，那么就深入检查他们的子节点，如果 2 个子节点不一样，就直接替换 oldVnode，即使这 2 个子节点的子节点一样，如果第一层不一样就不会深入比较第二层

#### 流程

从上面看下来,我们了解到了 patch 要做些什么,无非就是创建、删除、更新；下面我们来分析整个流程

初始化时，通过 render 函数生成 vNode，同时也进行了 Watcher 的绑定，当数据发生变化时，会执行\_update 方法，生成一个新的 VNode 对象，然后调用 **patch**方法，比较 VNode 和 oldNode，最后将节点的差异更新到真实的 DOM 树上 vue 在 update 的时候会调用以下函数

```
// 源码位置: /src/instance/lifecycle.js
 export function lifecycleMixin (Vue: Class<Component>) {
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
      const vm: Component = this
      const prevVnode = vpatch__ is injected in entry points
      // based on the rendering backend used.
      if (!prevVnode) {
        // 初次渲染，会传入原生dom节点和虚拟dom节点
        vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */)
      } else {
        // 更新
        vm.$el = vm.__patch__(prevVnode, vnode)
      }
    }

 }

```

vm.*patch*才是进行 vnode diff 的核心，来看看 patch 是怎么打补丁的（代码只保留核心部分）

patch 的会有 3 种情况

1. 如果 vnode 不存在，oldVnode 存在；那么需要销毁真实的 dom 节点
2. 如果 vnode 存在，oldVnode 不存在；那么需要创建节点
3. 2 者都存在，进行比较

```
// 源码位置: /src/core/vdom/patch.js
 /**
   * oldVnode 旧的真实的DOM节点
   * vnode  节点变化后生成新的Vnode
   */
 function patch (oldVnode, vnode) {

    // 如果vnode不存在，oldVnode存在，则调用销毁钩子销毁节点invokeDestroyHook(oldVnode)
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) invokeDestroyHook(oldVnode)
      return
    }

    let isInitialPatch = false
    const insertedVnodeQueue = []
      // 如果oldVnode不存在，Vnode存在，那么创建新节点，则调用createElm()
    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true
      createElm(vnode, insertedVnodeQueue)
      // 当Vnode和oldVnode都存在时
    } else {
      const isRealElement = isDef(oldVnode.nodeType)
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
           // patch 现有的根节点,对oldVnode和vnode进行diff，并对oldVnode打patch
        patchVnode(oldVnode, vnode, insertedVnodeQueue, null, null, removeOnly)
    }
 }
```

sameVnode 函数是判断 2 个节点是否是同一个节点

```
 // 源码位置: /src/instance/lifecycle.js
function sameVnode (a, b) {
  return (
    // key值
    a.key === b.key && (
      (
        a.tag === b.tag && //标签名
        a.isComment === b.isComment && // 2个节点是否是注释节点
        // 2个节点是否都定义了data，data中包含一些具体信息，例如：class，style
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)  // 当标签是input的时候，type必须相同
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}
```

### 2.7 总结

上面我们学习了 diff 的基本流程,在 diff 的整个过程就是创建节点、删除节点、更新节点，对源码也进行了讲解；下面我们将对 vnode 和 oldNode 都包含子节点的情况进行分析，这是 diff 的核心。

## 3.0 传统的更新子节点

### 3.1 前言

上一章我们学习了在 patch 过程中主要干 3 件事:创建节点、删除节点、更新节点，前 2 种都很简单，而更新节点较难些，本章我们要学习的是当 vnode 和 oldVnode 都有子节点，需要更新子节点的情况，这是 dom-diff 的核心，也是本章要学习的内容。

### 3.2 如何更新子节点

#### 传统的节点对比方式

当 vnode 和 oldVnode 都有子节点时，我们会比较虚拟 dom 对象中的 children,这个数组包含了所有子节点。我们把包含 vnode 的所有子节点数组命名为 newCh 而 oldVnode 的所有子节点命名为 oldCh，现在我们通过循环对比子节点

```
newCh.forEach(newChild=>{
  oldCh.forEach(oldChild=>{
     // 处理逻辑省略
  })
})
```

从上面代码和图可知，假如 newCh 和 oldCh 都包含的是 li 标签，我们通过循环进行比较新旧子节点，newCh 每项节点会跟 oldCh 的每项节点进行对比。

#### 理解未处理与已处理

从上图可知,我们假如 newCh 数组中的前 2 个子节点在 dlCh 数组中找到了对应的节点并给 odlCh 打了补丁,我们可以把已经对比过的称为已处理,没有对比的我们称未处理。

#### 对比中会出现以下几种情况

1. **创建子节点：**

newCh 某个节点跟 oldCh 的每个节点进行对比，发现没有找到，那么需要创建节点插入到 oldCh 中

当 newCh 的第二节点在 oldCh 里面没找到时，我们需要创建节点，创建完节点那我们插入到什么位置？假设我们插入已处理的后面，看起来是对的，那么如果 newCh 第三个节点在 oldCh 里面再没找到时，还适用这种方式吗？

从上图可以看出 newCh 第三个节点在 oldCh 里面再没找到时，按照上面的逻辑插入已处理的后面，那么这次新增的节点将会插入 oldCh 第二位置，那么 2 个节点的位置就不对应了，应该 newCh 第三个节点要对应 oldCh 第三的位置才行，**所以我们新增的节点应该插入未处理的前面就适应各种场景了**

2. **删除子节点：**

当 newCh 的第一个节点都循环完后，发现 oldCh 里面还有未处理的节点；这就说明在 newCh 没有这个节点；那么我们需要删除 oldCh 未处理的节点

3. **移动子节点：**

newCh 的某个节点跟 oldCh 每一个节点对比中发现有相同的，但是位置不同，那么我们需要更新 oldCh 的该节点让其与 newCh 的相同，在以 newCh 位置为基准去移动 oldCh 这个节点的位置，可以参考下图中，newCh 的第二个节点与 oldCh 的最后一个节点相同，但位置不同，那么我们需要移动 oldCh 最后一个节点的位置

4. **更新子节点：**

当 newCh 的某个节点和 oldCh 某个节点相同，位置也相同，那么我们需要更新 oldCh 的该节点让其与 newCh 的相同

## 4.0 优化的更新子节点

文章未完待续...

文章来源：[vue 虚拟 Dom](https://github.com/hejialianghe/Senior-FrontEnd/blob/master/docs/vue2.0/vittualdomAndDiff.md#31-%E8%99%9A%E6%8B%9Fdom)
