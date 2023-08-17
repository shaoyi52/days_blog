const {exec} = require('child_process')
// ���� -v ����
test('nrm -v',()=>{
  // ��ȡ��ǰ�汾�ź�Ӧ������
  const {name,version} = require("../package.json")
  // ͨ��exec����ִ��node��������bin/index.js ���������
  exec(`node bin/index.js -v`,(error,stdout,stderr)=>{
	if(error){
		console.error(`exec error ${error}`)
		return 
	}
	expect(stdout).toContain(`${name} v${version}`)
  });
})		

//���� ls ����
test('nrm ls',() => {
  //��ȡ�����ļ��е�����
  const dataObj = require("../bin/data.json")
  // ����shell����ִ��node����
  exec('node bin/index.js ls',(error,stdout,stderr)=>{
    if(error){
	  console.error(`exec error ${error}`)
	  return 
	}
	  //��ls����ִ�гɹ������data
	 Object.keys(dataObj).forEach(key=>{
	   //ͨ��expect�����ж�������������Ƿ�������е�data�е�����
	   expect(stdout).toContain(dataObj[key])
	 })
  })
})