# Vue 中数据更新了但页面没有更新的情况(8 种)

## Vue 无法检测实例被创建时不存在于 data 中的属性

**原因：**

由于 Vue 会在初始化实例时对 属性 执行 getter/setter 转化
所以 属性 必须在 data 对象上存在才能让 Vue 将它转换为响应式的。
**场景**

```
var vm = new Vue({
  data:{},
  // 页面不会变化
  template: '<div>{{message}}</div>'
})
vm.message = 'Hello!' // `vm.message` 不是响应式的

```

**解决方案**

```
var vm = new Vue({
  data: {
    // 声明 a、b 为一个空值字符串
    message: '',
  },
  template: '<div>{{ message }}</div>'
})
vm.message = 'Hello!
```

**扩展**

**VUE 组件中的 data 必须是函数？**

Object 是引用数据类型，如果不用 function 返回，每个组件的 data 都是内存的同一个地址，一个数据改变了其他也改变了。
只有函数构成作用域(注意理解作用域，只有函数{}构成作用域,对象的{}以及 if(){}都不构成作用域),data 是一个函数时，每个组件实例都有自己的作用域，每个实例相互独立，不会相互影响。

## Vue 无法检测‘对象属性’的添加或移除

**原因：**
由于 ES5 的限制，Vue.js 不能检测到对象属性的添加或删除。
因为 Vue.js 在初始化实例时将属性转为 getter/setter，所以属性必须在 data 对象上才能让 Vue.js 转换它，才能让它是响应的。
**场景：**

```
var vm = new Vue({
  data:{
    obj: {
      id: 001
    }
  },
  // 页面不会变化
  template: '<div>{{ obj.message }}</div>'
})

vm.obj.message = 'hello' // 不是响应式的
delete vm.obj.id       // 不是非响应式的

```

**解决办法：**

```
// 动态添加 - Vue.set
Vue.set(vm.obj, propertyName, newValue)

// 动态添加 - vm.$set
vm.$set(vm.obj, propertyName, newValue)

// 动态添加多个
// 代替 `Object.assign(this.obj, { a: 1, b: 2 })`
this.obj = Object.assign({}, this.obj, { a: 1, b: 2 })

// 动态移除 - Vue.delete
Vue.delete(vm.obj, propertyName)

// 动态移除 - vm.$delete
vm.$delete(vm.obj, propertyName)

```

## Vue 不能检测利用数组索引直接修改一个数组项

**原因：**
由于 JavaScript 的限制，Vue 不能检测数组和对象的变化；尤雨溪 - 性能代价和获得用户体验不成正比。

**场景：**

```
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items[1] = 'x' // 不是响应性的

```

**解决办法：**

```
// Vue.set
Vue.set(vm.items, indexOfItem, newValue)

// vm.$set
vm.$set(vm.items, indexOfItem, newValue)

// Array.prototype.splice
vm.items.splice(indexOfItem, 1, newValue)

```

**拓展：**
**Object.defineProperty() 可以监测数组的变化**
对数组新增一个属性（index）不会监测到数据变化，因为无法监测到新增数组的下标（index），删除一个属性（index）也是。

```
var arr = [1, 2, 3, 4]
arr.forEach(function(item, index) {
 Object.defineProperty(arr, index, {
    set: function(value) {
      console.log('触发 setter')
      item = value
    },
    get: function() {
      console.log('触发 getter')
      return item
    }
  })
})
arr[1] = '123'  // 触发 setter
arr[1]          // 触发 getter 返回值为 "123"
arr[5] = 5      // 不会触发 setter 和 getter

```

## Vue 不能监测直接修改数组长度的变化

**原因：**
由于 JavaScript 的限制，Vue 不能检测数组和对象的变化；
尤雨溪 - 性能代价和获得用户体验不成正比。(Object.defineProperty() 可以监测数据的变化)
**场景：**

```
var vm = new Vue({
  data: {
    items: ['a', 'b', 'c']
  }
})
vm.items.length = 2 // 不是响应性的

```

解决办法：

```
vm.items.splice(newLength)
```

## 在异步更新执行之前操作 DOM 数据不会变化

**原因：**
由于 Vue 在更新 DOM 时是异步执行的。
只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。
如果同一个 watcher 被多次触发，只会被推入到队列中一次。
这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。
然后，在下一个的事件循环中，Vue 刷新队列并执行实际 (已去重的) 工作。
Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

**场景：**

```
<div id="example">{{message}}</div>

var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
vm.$el.textContent === 'new message' // false
vm.$el.style.color = 'red' // 页面没有变化

```

**解决办法：**
使用 Vue.nextTick(callback) callback 将在 DOM 更新完成后被调用

```
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // 更改数据
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
  vm.$el.style.color = 'red' // 文字颜色变成红色
})

```

**拓展：**
**异步更新带来的数据响应的误解**

```
<!-- 页面显示：我更新啦！ -->
<div id="example">{{message.text}}</div>

var vm = new Vue({
  el: '#example',
  data: {
    message: {},
  }
})
vm.$nextTick(function () {
  this.message = {}
  this.message.text = '我更新啦！'
})

```

上段代码中，我们在 data 对象中声明了一个 message 空对象，然后在下次 DOM 更新循环结束之后触发的异步回调中，执行了如下两段代码：

```
this.message = {};
this.message.text = '我更新啦！'

```

到这里，模版更新了，页面最后会显示 我更新啦！。
模板更新了，应该具有响应式特性，如果这么想那么你就已经走入了误区。
一开始我们在 data 对象中只是声明了一个 message 空对象，并不具有 text 属性，所以该 text 属性是不具有响应式特性的。

但模板切切实实已经更新了，这又是怎么回事呢？

那是因为 Vue.js 的 DOM 更新是异步的，即当 setter 操作发生后，指令并不会立马更新，指令的更新操作会有一个延迟，当指令更新真正执行的时候，此时 text 属性已经赋值，所以指令更新模板时得到的是新值。

> 模板中每个指令/数据绑定都有一个对应的 watcher 对象，在计算过程中它把属性记录为依赖。之后当依赖的 setter 被调用时，会触发 watcher 重新计算 ，也就会导致它的关联指令更新 DOM。

**具体流程如下所示：**

- 执行 this.dataObj = {}; 时， setter 被调用。
- Vue.js 追踪到 message 依赖的 setter 被调用后，会触发 watcher 重新计算。
- this.message.text = 'new text'; 对 text 属性进行赋值。
- 异步回调逻辑执行结束之后，就会导致它的关联指令更新 DOM，指令更新开始执行。
  所以真正的触发模版更新的操作是 this.message = {};这一句引起的，因为触发了 setter，所以单看上述例子，具有响应式特性的数据只有 message 这一层，它的动态添加的属性是不具备的。
  > 对应上述第二点 - Vue 无法检测对象 property 的添加或移除

## 循环嵌套层级太深，视图不更新

看到网上有些人说数据更新的层级太深，导致数据不更新或者更新缓慢从而导致试图不更新？

由于我没有遇到过这种情况，在我试图重现这种场景的情况下，发现并没有上述情况的发生，所以对于这一点不进行过多描述（如果有人在真实场景下遇到这种情况留个言吧）。

针对上述情况有人给出的解决方案是使用强制更新：

> 如果你发现你自己需要在 Vue 中做一次强制更新，99.9% 的情况，是你在某个地方做错了事。
> 迫使 Vue 实例重新渲染。注意它仅仅影响实例本身和插入插槽内容的子组件，而不是所有子组件。

1. 不会重新触发生命周期钩子函数，比如 mounted
2. 不会渲染子组件的更新，即使子组件的 props 发生改变了。

```
vm.$forceUpdate()
```

## 路由参数变化时，页面不更新（数据不更新）

**原因：**
路由视图组件引用了相同组件时，当路由参会变化时，会导致该组件无法更新，也就是我们常说中的页面无法更新的问题。

**场景：**
在路由构建选项 routes 中配置了一个动态路由 '/home/:name'，它们共用一个路由组件 Home，这代表他们复用 RouterView 。
当进行路由切换时，页面只会渲染第一次路由匹配到的参数，之后再进行路由切换时，message 是没有变化的。

```
<div id="app">
  <ul>
    <li><router-link to="/home/foo">To Foo</router-link></li>
    <li><router-link to="/home/baz">To Baz</router-link></li>
    <li><router-link to="/home/bar">To Bar</router-link></li>
  </ul>
  <router-view></router-view>
</div>

const Home = {
  template: `<div>{{message}}</div>`,
  data() {
    return {
      message: this.$route.params.name
    }
  }
}

const router = new VueRouter({
  mode:'history',
 routes: [
    {path: '/home', component: Home },
    {path: '/home/:name', component: Home }
  ]
})

new Vue({
  el: '#app',
  router
})

```

**解决办法：**

解决的办法有很多种，这里只列举我常用到一种方法。

通过 watch 监听 $route 的变化。

```
const Home = {
  template: `<div>{{message}}</div>`,
  data() {
    return {
      message: this.$route.params.name
    }
  },
  watch: {
   '$route': function() {
      this.message = this.$route.params.name
    }
 }
}
...
new Vue({
  el: '#app',
  router

```

给 <router-view></router-view> 绑定 key 属性，这样 Vue 就会认为这是不同的<router-view>。
弊端：如果从 /home 跳转到 /user 等其他路由下，我们是不用担心组件更新问题的，所以这个时候 key 属性是多余的。

```
<div id="app">
  ...
  <router-view :key="key"></router-view>
</div>
```

## 使用 keep-alive 之后数据无法实时更新问题

keep-alive 相关内容
概念： <keep-alive> 是 Vue 的一个内部组件，适合用来缓存不需要实时更新的组件，这样可以保留组件状态避免重新渲染。
Props：

- include ：接受字符串或正则表达式，这里是需要被缓存的组件名
- exclude ：接受字符串或正则表达式，这里是不需要缓存的组件名
- max ：接受数字，最多可以缓存多少组件实例
  **问题描述：**
  问题： 在需要重新请求数据的时候，依然走的缓存
  根据需求实现在列表页点击“编辑”进行修改某项数据，修改完成返回之后，依旧保留在原位置，保留之前的查找条件和之前的数据，使用 vue 中的<keep-alive>之后，返回列表页时不刷新页面，依旧保持之前的数据，无法展示修改之后的最新消息。

**解决办法：**

方案 1： 如果要在进入页面的时候获取最新的数据，需要在 activated 阶段获取数据，承担原来 created 钩子中获取数据的任务(亲测，时而有效，时而无效，不知道是什么原因)。

- 方案 2： 在账户登录之后调用 **window.location.reload() **，起到重新请求的作用（已亲测）

- 方案 3： 在 vuex 中设置状态，动态绑定 include 值，在登录的时候缓存需要缓存的组件，在退出的时候，清除需要刷新的组件（效果很理想，也顺带解决了加载数据时，数据闪现的情况）

- 方案 4：借用组件内的守卫 beforeRouteEnter(to,from,next){},方法，

> 每次进入之后取到编辑之后的最新数据，然后把现有的列表中对应的数据进行修改，修改之后进行强制刷新，这样就可以实现需要的效果了。

beforeRouteEnter 守卫不能访问 this：因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。

不过，你可以通过传一个回调给 next 来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

```
beforeRouteEnter (to, from, next) {
    next(vm => {
        // 通过 `vm` 访问组件实例
    })
}

```

**注意:**
beforeRouteEnter 是支持给 next 传递回调的唯一守卫。
对于 beforeRouteUpdate 和 beforeRouteLeave 来说，this 已经可用了，所以不支持传递回调，因为没有必要了
