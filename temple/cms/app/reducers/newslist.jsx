import {
    ADD_NEWS,
    RECEIVE_NEWS,
    
} from '../actions';

const  newslist=(state={},action)=>{
  switch(action.type){
    case ADD_NEWS:    
      return action.news;
    case RECEIVE_NEWS:
      console.log('action');

      return  action.data 
    default:
      return state;  
  }
}

export default newslist;