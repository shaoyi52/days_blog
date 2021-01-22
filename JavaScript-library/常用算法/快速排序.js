const arr=[3,4,8,2,23,45,3,6,9,10]
let quiteQueue=(arr)=>{
	if(arr.length<=1) return arr;
	let left=[],right=[];
	let middleIndex=Math.floor(arr.length/2-1);//Math.ceil:向上取准,Math.floor:向下取准,Math.round
	let middle=arr.splice(middleIndex,1)
	arr.forEach(item=>{item>middle?left.push(item):right.push(item)})
	return quiteQueue(left).concat(middle,quiteQueue(right))
}
document.write(quiteQueue(arr))

分析
https://blog.csdn.net/nrsc272420199/article/details/82587933