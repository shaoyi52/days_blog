import fetch from 'isomorphic-fetch'
import { message } from 'antd'

export const OPEN_FORM_MODAL = 'OPEN_FORM_MODAL';
export const CLOSE_FORM_MODAL = 'CLOSE_FORM_MODAL';
export const CHANGE_TITLE='CHANGE_TITLE';
export const SELECT_Row= 'SELECT_Row';
export const READ_Row= 'READ_Row';
export const ADD_NEWS='ADD_NEWS';
export const READ_LIST='READ_LIST';
/*显示模态框*/
const networkErrorMsg = '网络异常，请刷新重试！';

export function openFormModal(){
  return {
        type: OPEN_FORM_MODAL,       
    }
}

/*隐藏模态框*/
export function closeFormModal() {
  return {
        type: CLOSE_FORM_MODAL,       
    }
}

export function readList(){
  console.log("readList")
  return  (dispatch)=>{
    return fetch ('http://localhost:3000/api/news/get')
    .then(response=>response.json())
    .then(json=>{
      dispatch(receiveNews(json.data))
      //console.log(json)
    })
  }
}


/*修改标题*/
export function changeTitle(title){
  return {
        type: CHANGE_TITLE, 
        title:title      
    }
}

/*选择表格行*/
export function selectRow(rowsId){
  return {
        type: SELECT_Row, 
        rowsId      
    }
}

/***新增***/
export function addNews(info){
  return(dispatch,getState) =>{
    let data=JSON.stringify(info);
    fetch("http://localhost:3000/api/news/add",{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:data,
      }).then(res=>{
        if(res.ok){
          return res.json()
        }
        
      }).then(json=>{
        console.log("json",json)
        if(json.code==0){
          dispatch(closeFormModal());
          message.success(json.message);
          dispatch(readList())
          //console.log(json.code);
        }
        /*if(json.code==0){
           info(json.message);
            //dispatch(closeFormModal());
            //message("res.message");
            //dispatch(readList())
          }else{
            //message(json.message);
          }*/
      }).catch((err)=>{
      message.error(networkErrorMsg,3)
      //console.error(err.message) 
    })


    /*fetch("http://localhost:3000/api/news/add",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
      },
      body:data,
    })
    .then(res=>{res.json(); console.log(res)})
    .then((res)=>{
      console.log("res",res);
      if(res.code==0){
          dispatch(closeFormModal());
          message("res.message");
          dispatch(readList())
        }else{
          message(res.message);
        }
    }).catch((err)=>{
      message.error(networkErrorMsg,3)
      //console.error(err.message) 
    })*/
  }
}

/***删除***/
export function delNewsById(id){
  return (dispatch)=>{
    const content =JSON.stringify({'id': id});
    return fetch ('http://localhost:3000/api/news/delete',{
      method: 'POST',
      headers:{
          "Content-Type": "application/json",
      },
      body: content
    })
    .then(response=>response.json())
    .then(json=>{ 
        console.log("del")       
       dispatch(readList())
    })
  }
}

/*更新行*/
export function updataRow(row){
  return (dispatch, getState)=>{
    const { selectedRowId } = getState().rowFormModal;
    let jsonRow=row;
    jsonRow['id']=selectedRowId;
    const content =JSON.stringify(row);
    console.log("content",content)
    return fetch('http://localhost:3000/api/news/edit',{
      method: 'POST',
      headers:{
          "Content-Type": "application/json",
      },
      body: content
    }).then(response=>response.json())
    .then(json=>{ 
      console.log(json);  
      dispatch(closeFormModal());     
      dispatch(readList())
    })

  }
}

/*查询*/
export function readRow(){
  return ( dispatch, getState) =>{
    const { selectedRowId } = getState().rowFormModal;

    return fetch ('http://localhost:3000/api/news/get?_id='+selectedRowId)
    .then(response=>response.json())
    .then(json=>{
      dispatch(openFormModal())
      dispatch({type:READ_Row,data:json.data[0]})
      //console.log(json)
    })
  

    console.log(selectedRowId);

  }
}



function receiveNews(data){
  console.log('data',data)
   return {
        type: READ_LIST,       
        dataSource: data       
    }
};