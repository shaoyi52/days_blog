/*

//引入events 模块
const events = require('events');
//创建eventsEmitter 对像
let eventEmitter =new events.EventEmitter();

//绑定事件及事件处理程序
eventEmitter.on('eventName',eventHandler);
//触发事件
eventEmitter.emit('eventName');

*/

var events = require('events');
var eventEmitter = new events.EventEmitter();
var connectHandler = function connected(){
  console.log("连接成功。");
  eventEmitter.emit('data_received');
}
eventEmitter.on('connection',connectHandler);

eventEmitter.on('data_received',function(){
  console.log('数据接收成功。');
})

eventEmitter.emit('connection');
console.log("程序执行完毕。");

