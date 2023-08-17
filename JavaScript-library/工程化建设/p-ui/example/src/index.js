import { createApp } from 'vue'
import PUI from '../../src/index.js'
import App from './App.vue'
// 加载样式
import '../../src/styles/index.scss' 
console.log(PUI)
createApp(App).use(PUI).mount('#app')
