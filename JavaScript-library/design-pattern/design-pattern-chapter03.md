设计模式手册 - 3 - 工厂模式
==
> create by **yuzhoufen** on **2019-08-05 10:200**
## 第三章 工厂模式
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