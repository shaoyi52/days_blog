const {exec} = require('child_process')
// 测试 -v 命令
test('nrm -v',()=>{
  // 获取当前版本号和应用名称
  const {name,version} = require("../package.json")
  // 通过exec工具执行node命令运行bin/index.js 并传入参数
  exec(`node bin/index.js -v`,(error,stdout,stderr)=>{
	if(error){
		console.error(`exec error ${error}`)
		return 
	}
	expect(stdout).toContain(`${name} v${version}`)
  });
})		

//测试 ls 命令
test('nrm ls',() => {
  //读取本地文件中的数据
  const dataObj = require("../bin/data.json")
  // 调用shell工具执行node命令
  exec('node bin/index.js ls',(error,stdout,stderr)=>{
    if(error){
	  console.error(`exec error ${error}`)
	  return 
	}
	  //若ls命令执行成功则遍历data
	 Object.keys(dataObj).forEach(key=>{
	   //通过expect对象判断输出的内容中是否包含所有的data中的内容
	   expect(stdout).toContain(dataObj[key])
	 })
  })
})