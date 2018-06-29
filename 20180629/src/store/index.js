/*
  vuex 
 */
import Vue from 'vue'
import Vuex from 'vuex'
import event from './event'
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    event
  }
})


/*
 const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> `moduleA`'s state
store.state.b // -> `moduleB`'s state
*/