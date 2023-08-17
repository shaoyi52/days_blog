import PButton from './Button.vue'
PButton.install = (app) => {
  app.component(PButton.name,PButton)
}
// 单独导出Button对象
export const Button = PButton
// 导出默认模块
export default PButton