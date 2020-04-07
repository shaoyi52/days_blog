vuex概念
==
> create by **yuzhoufen** on **2019-11-18 17:20**

state、mutations
```
const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
actions: {

},
modules: {
    app,
    user,
    loading
}
})
```
