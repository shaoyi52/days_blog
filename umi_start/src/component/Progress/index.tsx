import {Progress} from 'antd';
import React from 'react'
export default class ProgressLayout extends React.Component{
    constructor(props){
        super(props)
        this.state={
            percent:0,
            second:60,
            index:0,
            percentArr:[],
            secondArr:[]
        }
    }
    componentDidMount = ()=>{
        let {second,per}=this.props;
        let percentArr=this.createRandomGroup(100,per||10);
        let secondArr=this.createRandomGroup(second||30,per||10);
        this.setState({percentArr:percentArr,secondArr:secondArr}, ()=> {
            this.progressChange()
            // 123
           });
        
    }

    createRandomGroup=(_total,_per)=>{
        let per=_per; //份数
        let allPer=_total;
        let perArr=[]
        for(let i=0;i<per;i++){
            if(i==per-1){
                perArr.push(allPer);
            }else{
            let creatData=Math.ceil(allPer/2*Math.random());
            perArr.push(creatData);
            allPer=allPer-creatData; 
            }
            
        }
        return perArr
    }
    
    progressChange=()=>{
        let {index,percent,percentArr,secondArr}=this.state;
        let {finishFn}=this.props;
        setTimeout(async () => {            
            this.setState({index:index+1,percent:percent+percentArr[index]})   
            if(index==secondArr.length-1){
                finishFn&&finishFn();
            }else{
                this.progressChange();      
            }
          }, secondArr[index]*1000);
    }
    render(){
        const {percent}= this.state;

        return <Progress  percent={percent} strokeWidth={5}/>
    }
}