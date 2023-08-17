/*
 * @Description: Do not edit
 * @Author: yzf
 * @Date: 2023-08-16 17:03:05
 * @LastEditors: yzf
 * @LastEditTime: 2023-08-16 17:05:46
 * @FilePath: \p-ui\packages\container\index.js
 */
import PHeader from './Header.vue'
PHeader.install = (app) => {
  app.component(PHeader.name,PHeader)
}
// 单独导出Button对象
export const Header = PHeader
// 导出默认模块
export default PHeader