//JavaScript 使用 id 来寻找 canvas 元素：
var yyy=document.getElementById("xxx");
/*****
getContext() 方法
返回一个用于在画布上绘图的环境
如：Canvas.getContext(contextID)。
****/
var context = yyy.getContext('2d');
context.fillStyle = 'red'
context.strokeStyle = 'red'

var using=false;
var eraserEnable=false;
eraser.onclick=function(){
  eraserEnable=true;
}
pen.onclick=function(){
  eraserEnable=false;
}
clear.onclick = function(){
  context.clearRect(0, 0, yyy.width, yyy.height);
}
function drawLine(x1,y1,x2,y2){
  context.beginPath();//起始一条路径，或重置当前路径
  context.moveTo(x1,y1);//起点
  context.lineWidth=2;
  context.lineTo(x2,y2);//终点
  context.stroke();//绘制已定义的路径
  context.closePath();//创建从当前点回到起始点的路径
}

yyy.onmousedown=function(e){
  var x=e.clientX;
  var y=e.clientY;
  using=true;
  if(eraserEnable){
    context.clearRect(x,y,10,10);
  }else{
    lastPoint={
    "x":x,
    "y":y
    }
  }
  
  console.log(e);
}


yyy.onmousemove=function(e){
  var x=e.clientX;
  var y=e.clientY;
  if(!using){return}
  if(eraserEnable){
    context.clearRect(x,y,10,10);
  }else{
    newPoint={
      x:x,
      y:y
    }
    drawLine(newPoint.x,newPoint.y,lastPoint.x,lastPoint.y);

    lastPoint=newPoint;
  }
}

yyy.onmouseup=function(){
  using=false;
}