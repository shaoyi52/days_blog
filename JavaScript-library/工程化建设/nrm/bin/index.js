#!/usr/bin/env node 
let pkg = require("../package.json")

const fs = require("fs")
const path=require("path")
let argv = process.argv
// 文件转对象
const file2obj = (filePath) => {
  filePath = path.resolve(__dirname,filePath)
  return JSON.parse(fs.readFileSync(filePath).toString())
}
//对象转文件
const obj2file = (dataObj) => {
  fs.writeFileSync(
    path.resolve(__dirname,'./data.json'),
	JSON.stringify(dataObj)
  )
}

// 获取镜像对象
const dataObj = file2obj('./data.json')


if(argv.indexOf('-v')>-1){
 console.log(`${pkg.name} v${pkg.version}`)
}else if(argv.indexOf('ls')>-1){
	 Object.keys(dataObj).forEach(key=>{
		console.log(`${key} => ${dataObj[key]}`)
	 })
}else if(argv.indexOf('add')!=-1){
   let index = argv.indexOf('add');
   let key = argv[index+1];
   let value = argv[index+2];
   dataObj[key]=value;
   obj2file(dataObj);
   console.log(`success added registry`)
}else if(argv.indexOf('del')!=-1){
	let index = argv.indexOf('del');
	let key =argv[index+1]
    if( dataObj[key]){
	  delete dataObj[key]
	  obj2file(dataObj);
	  console.log(`success deleted registry`)
	}else{
		  console.log(`${key} is not in nrm list`)
	}
	
}else if(argv.indexOf('use')!=-1){
	let index = argv.indexOf('use');
	let key = argv[index+1];
    let value = argv[index+2];
	if(dataObj[key]){
		// 获取exec命令行接口
		const {exec} = require('child_process')
		// 执行npm config set registry 命令
		exec(`npm config set registry ${dataObj[key]}`,(error,stdout,stderr)=>{
			if(error){
			  console.log(`exec error : ${error}`);
			  return;
			}else{
			   console.log(`set registry success: ${dataObj[key]}`);
			}
		});
	}else{
	  console.log(`${key} is not in nrm list`)
	}
}else if(argv.indexOf('-h')!=-1){
  console.log(`
   add:nrm add key value can add registry address to list
   del:nrm del key can delete key fof list
   ls:nrm ls can show all list
   clear:nrm clear can clear list
   -v:nrm -v can show version
  `)
}
//console.log(argv)