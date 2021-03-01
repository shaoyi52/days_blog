# JS 继承

> create by **yuzhoufen** on **2020-11-24 17:20**

1. 原型链继承
   核心： **将父类的实例作为子类的原型**
   缺点： **父类新增原型方法/原型属性，子类都能访问到，父类一变其它的都变了**
   示例：

```
function Person (name) {
            this.name = name;
        };

        Person.prototype.getName = function () {    //对原型进行扩展
            return this.name;
        };

        function Parent (age) {
            this.age = age;
        };

        Parent.prototype = new Person('riemann');   //这一句是关键 //通过构造器函数创建出一个新对象，把老对象的东西都拿过来。

        Parent.prototype.getAge = function () {
            return this.age;
        };

//        Parent.prototype.getName = function () {   //可以重写从父类继承来的方法,会优先调用自己的。
//            console.log(222);
//        };

        var result = new Parent(22);
        console.log(result.getName());  //riemann　　//调用了从Person原型中继承来的方法(继承到了当前对象的原型中)　　
        console.log(result.getAge());   //26 　　//调用了从Parent原型中扩展来的方法

```

2. 构造继承
   核心：**使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）**

缺点： **方法都在构造函数中定义， 只能继承父类的实例属性和方法，不能继承原型属性/方法，无法实现函数复用，每个子类都有父类实例函数的副本，影响性能**

3. 组合继承

4. 寄生组合继承
