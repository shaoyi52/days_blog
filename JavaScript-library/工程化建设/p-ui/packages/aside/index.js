/*
 * @Description: Do not edit
 * @Author: yzf
 * @Date: 2023-08-16 16:36:15
 * @LastEditors: yzf
 * @LastEditTime: 2023-08-16 16:39:18
 * @FilePath: \p-ui\packages\aside\index.js
 */
import PAside from './Aside.vue'
PAside.install = (app) => {
  app.component(PAside.name,Aside)
}
// 单独导出Button对象
export const Aside = PAside
// 导出默认模块
export default PAside