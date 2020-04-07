const superagent = require('superagent');
const requestPage=function(options){
	return new Promise(async(resolve,reject)=>{
		let initOptions={}
		let reqOptions=Object.assign(initOptions,options)
		superagent.get()
	})
}