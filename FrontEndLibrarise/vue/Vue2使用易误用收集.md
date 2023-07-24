#Vue 实例易错误使用

```
new Vue({
  el:"#app",
  data(){ return {} },//容易误使用直接返回{};
  components:{}, //容易误使用[],
})
```
