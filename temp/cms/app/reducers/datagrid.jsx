import {
    SELECT_Row,
} from '../actions/datagrid';

const datagrid=(state={title:'更新',row:[],visible:false},action)=>{

  switch(action.type){    
    case SELECT_Row:
      return {
        ...state,
        row:action.rows
      }  
    default:
      return  state;
  }
}

export default datagrid;