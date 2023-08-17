import * as Components from '../packages'
export * from '../packages' //用于按需导出

const {version,name} = require('../package.json')


const install =(app)=>{
  Object.keys(Components).forEach(key=>{
    console.log(Components[key])
    app.use(Components[key])
  })
}

// 全量导出
export default{
  version,
  name,
  install,
  ...Components
}