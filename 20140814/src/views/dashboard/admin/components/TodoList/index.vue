<template>
  <el-card class="box-card  todoApp"> 
     <div slot="header" class="clearfix">
      <input placeholder="Todo List" @keyup.enter="addTodo">
    </div>
    <section class="main">
      <div class="listItem" v-for="(todo,key) in filteredTodos"><input type="checkbox" :checked="todo.done" @click="toggleTodo(todo)" />{{ todo.text}} <i class="icon-i-close delateAction" @click="delTodo(todo)"></i></div>
    </section>
    <div class="footer">
      <span><strong>{{remaining}}</strong>{{remaining|pluralize('item')}}</span>
      <ul><li v-for="(val,key) in filters" @click.prevent="visibility=key" :class="{ selected: visibility === key }">{{key}}</li></ul>
    </div>
  </el-card>  
</template>

<script>
//import { mapGetters } from 'vuex'
const filters={
  all:todos=>todos,
  active:todos=>todos.filter(todo=>!todo.done),
  complete:todos=>todos.filter(todo=>todo.done)
}
const defaultList=[
{text:'start this repository',done:false},
{text:'fork this repository',done:true}
]
const STORAGE_KEY='todos';

export default {
  name: 'TodoList',
  data() {
    return {
      visibility:'all',
      todos:defaultList,
      filters
      //task:"new task"
    }
  },
  methods:{
    setLocalStorage(){
      window.localStorage.setItem(STORAGE_KEY,JSON.stringify(this.todos))
    },
    addTodo(e){
      const text=e.target.value;
      if(text.trim()){
        this.todos.push({text:e.target.value,done:false}) 
        this.setLocalStorage();
      }
      e.target.value="";
     
      //console.log("dd",e.target.value)
    },
    delTodo(todo){
      this.todos.splice(this.todos.indexOf(todo),1)
      console.log(this.todos);
      this.setLocalStorage();
    },
    toggleTodo(todo){
      todo.done=!todo.done
      console.log(todo)
      this.setLocalStorage();
    }
  },
  computed:{
    filteredTodos() {
      return filters[this.visibility](this.todos)
    },
    remaining(){
      return this.todos.filter(todo=> !todo.done).length;
    }
  },
  filters:{
    pluralize:(n,w)=>n===1?w:w+'s',
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" >
  
  .listItem{
    position:relative;
  
    .delateAction{
      display:none;
      position:absolute;
      right:5px;
      top:50%;
      transform:translate(0,-50%)
    }
    &:hover .delateAction{
      display:block;
    }
  }
  .footer{
    padding-top:15px;
    color:#d8d8d8;
    ul{
      padding:0;
      margin:0;
      display:inline-block;
      li{
        display:inline-block;
        padding:2px 4px;
        &.selected{
          border:solid 1px #34bfa3
        }
      }
    }
  }
  

</style>
