 微任务,宏任务和Event-Loop
==
> create by **yuzhoufen** on **2019-11-18 17:20**

一段代码让你了解Event-Loop
```
console.log(1);
setTimeout(() => {
    console.log(2);
}, 0);
new Promise((resolve, reject) => {
    console.log(3);
    resolve();
}).then(data => {
    console.log(4);
    setTimeout(() => {
        console.log(5);
    }, 0);
});
```