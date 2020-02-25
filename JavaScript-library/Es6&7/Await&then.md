Async/Await使用 
==
> create by **yuzhoufen** on **2019-09-09 11:200**

## promise then
```
promise= new Promise((resolve,reject)=>{
	setTimeout(()=>{
		let num= parseInt(Math.random()*100);
        if(num>50){
           resolve(num)
         }else{
           reject(num)
         }
    },10000)
})
promise.then(res=>{console.log("res",res)},err=>{console.log('err',err)})
```
## promise.all([]).then(result=>{}).catch(err=>{})
```
let wake=(time)=>{
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      console.log(time/1000+ '秒苏醒了')
      resolve(time/1000+ '秒苏醒了')    
    },time) 
  })
}
let p1=wake(3000);
let p2=wake(4000);
let p3=wake(5000);
Promise.all([p1,p2,p3]).then(result=>{
  console.log(result)
}).catch(err=>{
  console.log(err)
})
```
## ES7 Async/Await
1. 用法：
 使用async 声明函数，在async函数内使用await 
 ```
 async function xxx(){
　　await [表达式1]
　　await [表达式2]
　　//.....
}
  ```
2. 实例
```
function thePromise(){
  return new Promise(resolve=>{
    setTimeout(()=>{
      resolve('异步完成')
    },1000)
  })
}
async function gogogo(){
  let a = 1
  a = await thePromise() // 异步完成
  console.log(a)
}
gogogo(); //像普通函数一样调用
```
### 3.1 概念
&emsp;工厂模式是用来创建对象的一种最常用的设计模式。我们不暴露创建对象的具体逻辑，而是将将逻辑封装在一个函数中，那么这个函数就可以被视为一个工厂。工厂模式根据抽象程度的不同可以分为：简单工厂，工厂方法和抽象工厂。
### 3.2 工厂模式分类：
 1.简单工厂模式  
 &emsp;简单工厂模式又叫静态工厂模式，由一个工厂对象决定创建某一种产品对象类的实例。主要用来创建同一类对象
 ```
 let CarFactory = function (carType) {
  function Aodi () {
     this.play = function () {
        console.log('我在造奥迪');
    }
  }
  function Baoma() {
     this.play = function () {
        console.log('我在造宝马');
    }
  }
 
  switch (carType) {
    case 'Aodi':
      return new Aodi();
      break;
    case 'Baoma':
      return new Baoma();
      break;   
    default:
      throw new Error('参数错误, 可选参数:Aodi,Baoma');
  }
}

//调用
let Baoma = CarFactory('Baoma');
Baoma.play()
let Aodi = CarFactory('Aodi') 
Aodi.play()
 ```