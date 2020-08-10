[proxy](https://www.cnblogs.com/tugenhua0707/p/10306793.html)

#

```
new Vue({
  el:"#app",
  data:{coutn:0},
  methods:{
    add(){
      this.count++
    },
    reduce(){
      this.count--
    }
  }
})
```

```
class Vue{
  constructor(options){
    this.$el=document.querySelector(options.el);
    this.methods=options.methods;
    this._binding={};
    this._observer(options.data);
    this._compile(this.$el);
  }
  _observer(datas){
    const me = this;
    const handler = {
      set(target,key,value) {
        const rets = Reflect.set(target,key,value);
        me._binding[key].map(item=>{
        item.update();
        })
      }
    }
    this.$data=new Proxy(datas,handler)
  }

  _compile(root){
    const nodes= Array.prototype.slice.call(root.children);
  }
}
```
