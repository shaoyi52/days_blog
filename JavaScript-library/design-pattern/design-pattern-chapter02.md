设计模式手册 - 2 - 面向对象
==
> create by **yuzhoufen** on **2019-08-05 10:200**
## 第二章 面向对象
### 2.1 概念
&emsp;面向对象程序设计（Object Oriented Programming，OOP）是一种计算机编程架构。OOP的一条基本原则是计算机程序由单个能够起到子程序作用的单元或对象组合而成。OOP达到了软件工程的三个主要目标：重用性、灵活性和扩展性。OOP=对象+类+继承+多态+消息，其中核心概念是类和对象。
面向对象程序设计方法是尽可能模拟人类的思维方式，使得软件的开发方法与过程尽可能接近人类认识世界、解决现实问题的方法和过程，也即使得描述问题的问题空间与问题的解决方案空间在结构上尽可能一致，把客观世界中的实体抽象为问题域中的对象。
面向对象程序设计以对象为核心，该方法认为程序由一系列对象组成。类是对现实世界的抽象，包括表示静态属性的数据和对数据的操作，对象是类的实例化。对象间通过消息传递相互通信，来模拟现实世界中不同实体间的联系。在面向对象的程序设计中，对象是组成程序的基本模块。
### 2.2 特点(三要素)
### 2.2.1. 封装性
&emsp;封装是指将一个计算机系统中的数据以及与这个数据相关的一切操作语言（即描述每一个对象的属性以及其行为的程序代码）组装到一起，一并封装在一个有机的实体中，把它们封装在一个“模块”中，也就是一个类中，为软件结构的相关部件所具有的模块性提供良好的基础。在面向对象技术的相关原理以及程序语言中，封装的最基本单位是对象，而使得软件结构的相关部件的实现“高内聚、低耦合”的“最佳状态”便是面向对象技术的封装性所需要实现的最基本的目标。对于用户来说，对象是如何对各种行为进行操作、运行、实现等细节是不需要刨根问底了解清楚的，用户只需要通过封装外的通道对计算机进行相关方面的操作即可。大大地简化了操作的步骤，使用户使用起计算机来更加高效、更加得心应手
```
js
class Person {
  constructor(name,age){
    this.name=name;
    this.age=age;
  }
  eat(){
    alert(`${this.name} eat something`)
  }
  speak(){
    alert(`My name is ${this.name},age ${this.}`)
  }
}

let yuyi=new Person("yuyi",20)
yuyi.eat();

let linqin=new Person("linqin",28)
linqin.speak();
```
&emsp;&emsp;**对象封装 属性/状态[name,age],动作/行为[eat,speak]**

#### 2.2.2 继承性

&emsp;&emsp;**简单来说，就是子类继承父类。继承可将公共方法抽离出来，提高复用，减少冗余**

&emsp; 继承性是面向对象技术中的另外一个重要特点，其主要指的是两种或者两种以上的类之间的联系与区别。继承，顾名思义，是后者延续前者的某些方面的特点，而在面向对象技术则是指一个对象针对于另一个对象的某些独有的特点、能力进行复制或者延续。如果按照继承源进行划分，则可以分为单继承（一个对象仅仅从另外一个对象中继承其相应的特点）与多继承（一个对象可以同时从另外两个或者两个以上的对象中继承所需要的特点与能力，并且不会发生冲突等现象）；如果从继承中包含的内容进行划分，则继承可以分为四类，分别为取代继承（一个对象在继承另一个对象的能力与特点之后将父对象进行取代）、包含继承（一个对象在将另一个对象的能力与特点进行完全的继承之后，又继承了其他对象所包含的相应内容，结果导致这个对象所具有的能力与特点大于等于父对象，实现了对于父对象的包含）、受限继承、特化继承。
```
//父类：人类Person
class People {
  constructor(name,age) {
    this.name=name;
    this.age=age;
  }
  eat() {
    alert(`${this.name} eat something`);
  }
  speak() {
    alert(`My name is ${this.name},age ${this.age}`)
  }
}
//子类：学生Student
class Student extends People{
  constructor(name,age,id){
    super(name,age);
    this.id=id;
  }
  study() {
    alert(`${this.name} ID is ${this.id}`)
  }
}

//在这里，子类学生继承了父类人类，学生既可以调用study()类
//也可以调用父类中的eat()和speak()
let studentYuyi = new Student('Yuyi',18,'003');
studentYuyi.study();
studentYuyi.eat();
```
#### 2.2.3. 多态性
&emsp;从宏观的角度来讲，多态性是指在面向对象技术中，当不同的多个对象同时接收到同一个完全相同的消息之后，所表现出来的动作是各不相同的，具有多种形态；从微观的角度来讲，多态性是指在一组对象的一个类中，面向对象技术可以使用相同的调用方式来对相同的函数名进行调用，即便这若干个具有相同函数名的函数所表示的函数是不同的。**多态，同一接口不同实现。在JavaScript中应用极少，因为多态是需要结合后端语言的接口、重写、重载等功能。多态的优点：1、保持子类的开放性和灵活性；2、面向接口编程；3、JavaScript引用极少。**
```
class People {
  constructor(name) {
    this.name = name
  }
  saySomething() {
    alert(`Hello, my name is ${this.name}`)
  }
}
class A extends People {
  constructor(name){
    super(name)
  }
  saySomething(){
    alert(`Hello, my name is A`)
  }
}
class B extends People {
  constructor(name){
    super(name)
  }
  saySomething(){
    alert(`Hello, my name is B`)
  }
}

let a = new A('a');
a.saySomething();

let b = new B('b');
b.saySomething();
```
在上面的例子中，我们可以看出，A类继承了People类，同时，A类重写了saySomething()方法，B类也是如此， 因而，做到了多态效果。

### 2.3设计原则
* 设计原则
  * 准则1：小即是美。
  * 准则2：让每个程序只做好一件事
  * 准则3：快速建立原型
  * 准则4：舍弃高效率而取可移植性
  * 准则5：采用纯文本来存储数据
  * 准则6：避免强制性的用户界面
  * 准则7: 让每个程序都称为过滤器。
* 五大设计原则为：SOLID.
  * S-单一职责原则：1、一个程序只做好一件事；2、如果功能过于复杂就拆分开，让每个部分保持独立
  * O-开放封闭原则：1.对扩展开放，对修改封闭；2、增加需求时，扩展新代码，而非修改已有代码；
  * L-里氏替换原则：1、子类能覆盖父类；2、父类能出现的地方子类就能出现
  * I-接口独立原则:1、保持接口的单一独立，避免出现"胖接口"；2、JavaScript中没有接口（TypeScript例外），使用效少；3、类似于单一职责原则，这理更关注接口。
  * D-依赖导致 ？倒置原则：1、面对接口编程，依赖于抽象而不依赖于具体；2、使用方只关注接口而不关注具体类的实现 

在设计原则中，S O 体现较多，详细介绍；而LID体现较少，但是需要了解其用意。
* 有没有具体例子？有的：
```
//加载图片
function loadImg(src){
  var promise = new Promise(function(resolve,reject){
    var img = document.createElement('img');
    img.onload = function(){
      resolve(img)
    };
    img.onerror = function(){
      reject('图片加载失败')
    };
    img.src = src;
  })
}

var src = 'https://www.imooc.com/static/img/index/logo_new.png';
var result = loadImg(src);
result.then(function(img) {
    // part1
    console.log('ing.width', img.width);
    return img;
}).then(function(img) {
    // part2
    console.log('img.height', img.height);
}).catch(function(ex) {
    // 统一捕获异常
    console.log(ex);
})
```
在这里，实现了单一职责原则和开放封闭原则。
1. 单一职责原则：每个 then 中的逻辑只做好一件事。
2. 开放封闭原则：如果新增需求，扩展 then 。
3. 对扩展开放，对修改封闭。

### 2.4设计模式
* 设计模式分为多少种？23种，大致可以分为创建型、组合型、行为型。
  * 创建型:1、工厂模式（工厂方法模式，抽象工厂模式，建造者模式）；2、单例模式；3、原型模式
  * 结构型：1、适配器模式；2、模板方法模式；3、代理模式；4、桥接模式；5、外观模式；6、组合模式；7、享元模式
  * 行为型-1：1、策略模式；2、模板方法模式；3、观察者模式；4、迭代器模式；5、职责连模式；6、组合模式；7、享元模式
  * 行为型-2：1、备忘录模式；2、状态模式；3、访问者模式；4、中介者模式；5、解释器模式。
### 2.5实例
* 题目一：
  * 打开时，可以 打专车或快车。任何车都有车牌号和名称。
  * 不同车价格不同，快车每公里1元，专车每公里2元。
  * 行程开始时显示车辆信息
  * 行车结束时，显示打车金额（假定行程就5公里）

1.ES6代码
```
class Car {
  construction(number,name){
    this.name = name;
    this.number = number;
  }
}

class Kaiche {
  construction(number,name){
    super(number,name);
    this.price=1;
  }
}

class Zhuche {
  construction(number,name){
    super(number,name);
    this.price=2
  }
}

class Trip{
  construction(car){
    this.car=car
  }
  start(){
    console.log(`行程开始，车名：${this.car.name},车牌：${this.car.number};`)
  }
  end(){
    console.log(`行程结束，价格：${this.car.price*5};`)
  }
}

let car =new Kaiche(1,'奔弛')
let trip = new Trip(car);
trip.start();//行程开始，车名：奔弛,车牌：1
trip.end();//行程结束，价格：5
```
* 题目二：
  * 某停车场，分3层，每层100车位
  * 每个车位都能监控到车辆的驶入和离开
  * 车辆进入前，显示每层的空余车位数量
  * 车辆进入时，摄像头可识别车牌号和时间
  * 车辆出来时，出口显示器显示车牌号和停车时长
1. ES6 代码
```
// 车辆
class Car {
  constructor(num) {
    this.num = num;
  }
}

//入口 摄像头
class Camera {
  shot(car){
    return {
      num: car.num,
      inTime:Date.now()
    }
  }
}

//出口 显示屏
class Screen{
  show(car,inTime){
    console.log(`车牌号：${car.num}`)
    console.log(`停车时间：${Date.now() - inTime}`);
  }
}

//停车场
class Park {
  constructor(floors){
    this.floors = floors || [];
    this.camera = new Camera();
    this.screen = new screen();
    this.carList = {}; // 存储摄像头拍摄返回的车辆信息
  }

  in(car){
    // 通过摄像头获取信息
    const info = this.camera.shot(car);
    //停到某个停车位
    const i = parseInt(Math.random() * 100)
    const place = this.floors[0].places[i];
    place.in();
    info.places = place;
    // 记录信息
    this.carList[car.num] = info;
  }
  out(car) {
    // 获取信息
    const info = this.carList[car.num];
    //将停车位清空
    place.out();
    //显示时间
    this.screen.show(car,info.inTime)
    //清空记录
    delete this.carList[car.num]
  }
  emptyNum() {
    return this.floors.map(floor =>{
      return `${floor.index} 层还有 ${floor.emptyPlaceNum()} 个空闲车位。`
    }).join('\n');
  }
}

// 楼层
class Floor{
  constructor(index,places) {
    this.index = index;
    this.places = places || [];
  }
  emptyPlaceNum(){
    let num = 0;
    this.places.forEach(p => {
      if(p.empty){
        num = num + 1
      }
    })
  }  
}

// 车位
class Place{
  constructor(){
    this.empty = true;
  }
  in() {
    this.empty = false;
  }
  out() {
    this.empty = true;
  }
}

//测试
//初始化停车场 
const floors = [];
for (let i = 0; i<3; i++){
  const places=[];
  for(let j=0;j<100;j++){
    place[j]=new Place();
  }
  floors[i]=new Floors(i + 1,places);
}
const park = new Park(floors);
// 初始化车辆
const car1 = new Car(100);
const car2 = new Car(200);
const car3 = new Car(300);

console.log("第一辆车进入");
console.log(park.emptyNum());
park.in(car1);
console.log("第二辆车进入");
console.log(park.emptyNum());
park.in(car2);
console.log("第一辆车离开");
park.out(car1);
console.log("第二辆车离开");
park.out(car2);

console.log(park.emptyNum());
park.in(car3);
console.log("第三辆车进入");
park.in(car3);
console.log("第三辆车离开");
park.out(car3);

/*
 * 打印信息为：
 * 第一辆车进入
 * 1 层还有 100 个空闲车位。
   2 层还有 100 个空闲车位。
   3 层还有 100 个空闲车位。
 * 第二辆车进入
 * 1 层还有 99 个空闲车位。
   2 层还有 100 个空闲车位。
   3 层还有 100 个空闲车位。
 * 第一辆车离开
 * 车牌号 100
 * 停车时间 1
 * 第二辆车离开
 * 车牌号 200
 * 停车时间 2
 * 1 层还有 100 个空闲车位。
   2 层还有 100 个空闲车位。
   3 层还有 100 个空闲车位。
 * 第三辆车进入
 * 第三辆车离开
 * 车牌号 300
 * 停车时间 1
*/
```