惰性函数
==
> create by **yuzhoufen** on **2020-04-10 11:20**
## 概念
同一个函数被大量范围，并且这个函数内部又有许多判断来来检测函数，第一次判断完成后，直接把这个函数改写，不在需要判断。
#### 介绍
* **意图**：减少浪费时间和浏览器资源
* **主要解决**：--。
* **何时使用**：--。
* **如何解决**：--。
### 代码示例
 1.demo1  

 ```
 //惰性函数写法
function createXHR(){
     var xhr=null;
     if(typeof XMLHttpRequest!='undefined'){
          xhr=new XMLHttpRequest();
         createXHR=function(){
               return XMLHttpRequest();  //直接返回一个懒函数，这样不必在往下走
          }
      }else{
          try{
               xhr=new ActiveXObject("Msxml2.XMLHTTP");
              createXHR=function(){
                    return new ActiveXObject("Msxml2.XMLHTTP");
               }
          }catche(e){
               try{
                    xhr =new ActiveXObject("Microsoft.XMLHTTP");
                    createXHR=function(){
                         return new ActiveXObject("Microsoft.XMLHTTP");
                    }
               }catch(e){
                    createXHR=function(){
                         return null
                    }
               }        
         }
     }
}
 ```
 2. 代码练习
* [codepen地址](https://codepen.io/pen/)
* [codesandbox地址](https://codesandbox.io/s/vanilla)
3. 参考相关资料
* [设计模式](https://www.runoob.com/design-pattern/builder-pattern.html)