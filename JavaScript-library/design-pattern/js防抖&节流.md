防抖&&节流函数
==
> create by **yuzhoufen** on **2020-04-10 11:20**
## 概念
防抖（debounce）
所谓防抖，就是指触发事件后在 n 秒内函数只能执行一次，如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
#### 介绍
* **意图**：减少浪费时间和浏览器资源
* **主要解决**：--。
* **何时使用**：--。
* **如何解决**：--。
### 代码示例
 1.非立即执行版 

 ```
 //非立即执行版
/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func,wait,immediate) {
    let timeout;

    return function () {
        let context = this;
        let args = arguments;

        if (timeout) clearTimeout(timeout);
        if (immediate) {
            var callNow = !timeout;
            timeout = setTimeout(() => {
                timeout = null;
            }, wait)
            if (callNow) func.apply(context, args)
        }
        else {
            timeout = setTimeout(function(){
                func.apply(context, args)
            }, wait);
        }
    }
}
 ```

## 概念
节流（throttle）
所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数
```
/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param type 1 表时间戳版，2 表定时器版
 */
function throttle(func, wait ,type) {
    if(type===1){
        let previous = 0;
    }else if(type===2){
        let timeout;
    }
    return function() {
        let context = this;
        let args = arguments;
        if(type===1){
            let now = Date.now();

            if (now - previous > wait) {
                func.apply(context, args);
                previous = now;
            }
        }else if(type===2){
            if (!timeout) {
                timeout = setTimeout(() => {
                    timeout = null;
                    func.apply(context, args)
                }, wait)
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