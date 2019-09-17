const arr=[3,4,8,2,23,45,3,6,9,10]
let bubbleSort=(arr)=>{
	for(let i=0;i<arr.length;i++){
		for(let j=0;j<arr.length-i-1;j++){
			if(arr[j]>arr[j+1]){
				[arr[j],arr[j+1]] = [arr[j+1],arr[j]]
			}
		}
	}
}
bubbleSort(arr)
document.write(arr)