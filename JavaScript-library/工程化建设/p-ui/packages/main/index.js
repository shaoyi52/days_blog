import PMain from './Main.vue'
PMain.install = (app) => {
  app.component(PMain.name,PMain)
}
// 单独导出Button对象
export const Main = PMain
// 导出默认模块
export default PMain