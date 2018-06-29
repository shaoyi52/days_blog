<template>
  <div id="app">
    <img src="./assets/logo.png">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <EventAdd/>
    <EventList/>
    <section class="container" >

    </section>  
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import EventAdd from './components/event_add.vue'
import EventList from './components/event_list.vue'

export default {
  name: 'app',
  components: {
    HelloWorld,
    EventAdd,
    EventList
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
