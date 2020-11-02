import {
    OPEN_FORM_MODAL,
    CLOSE_FORM_MODAL,
    SELECT_Row,
    ADD_NEWS,
    READ_Row,
    CHANGE_TITLE,
    READ_LIST
} from '../actions/rowFormModal';

const rowFormModal=(state={title:'更新',dataSource:[],selectedRowId:null,row:{},visible:false},action)=>{

  switch(action.type){
    case OPEN_FORM_MODAL: 
      return {
        ...state,
        visible: true,        
      }
    case CLOSE_FORM_MODAL:
      return {
        ...state,
        visible: false,        
      }
    case CHANGE_TITLE:
      return{
        ...state,
        title:action.title
      } 

    case SELECT_Row:
      return {
        ...state,
        selectedRowId:action.rowsId
      } 
    case ADD_NEWS:
      return {
        ...state,
        message:action.msg
      }   
    case READ_Row:
      return {
        ...state,
        row:action.data
      }  
    case READ_LIST:
      return {
        ...state,
        dataSource:action.dataSource
      }    
    default:
      return  state;
  }
}

export default rowFormModal;