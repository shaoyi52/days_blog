/**
 * example
 * 弥补JSON.parse(JSON.stringify(obj))【有缺陷】
 * 1.属性值为函数和undefined的属性会丢失
 * 2.属性值为正则表达式的会变成{}
 * 3.属性值为时间对象的会变成时间字符串
 * 
 * let obj = {
 *   string: "字符串",
 *   Number: 10,
 *   null: null,
 *   undefined: undefined,
 *   date: new Date(),
 *   function: () => {
 *      console.log("我是一个函数");
 *   },
 *   RegExp: /^([0]{2}|0[1-9]|[1-9])\d*$/,
 * };
 * deepCopy(obj);
 */
  
 /**
  *  deepCopy 深拷贝
  * @param {*} obj 
  * @returns obj 
  * 
  */

function deepCopy(obj) {
    if (obj === null) return null;
    if (typeof obj !== "object") return obj;
    if (obj.constructor === Date) return new Date(obj);
    if (obj.constructor === RegExp) return new RegExp(obj);
    var newObj = new obj.constructor(); //保持继承链
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            //不遍历其原型链上的属性
            var val = obj[key];
            newObj[key] = typeof val === "object" ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
        }
    }
    return newObj;
}
export default {
    deepCopy
};