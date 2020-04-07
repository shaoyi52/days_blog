/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let result=new Map();
    let diff=0;
    let out=[];
    let len=nums.length
    for(let i=0;i<len;i++){
        diff=target-nums[i]
        let diffVal= result.get(diff)
        if(result.has(diff)&&diffVal!=i){
            out.push(i)
            out.push(diff)            
        }else{
            result.set(result[i],i)
        }
        
    }
    return out
};
