import {
  ADD_TODO,
  CHANGE_TODO_TO_DOING,
  CHANGE_DOING_TO_DONE,
  CHANGE_DOING_TO_TODO,
  DELETE_TODO
} from '../actions'

let todos;
(()=>{
   if (localStorage.todos) {
        todos = JSON.parse(localStorage.todos);
    } else {
        todos = [];
    }
})()

const todolist = (state = todos, action) => {
  switch (action.type) {
    /*
     * 1添加新的事项
     * 并进行本地化存储
     * 使用ES6展开运算符链接新事项和旧事项
     * JSON.srtingify进行对象深拷贝
     */
    case ADD_TODO:
        return [
            ...state,{
              todo: action.text,
              istodo: true,
              doing: false,
              done: false
            }
        ]; 

    case CHANGE_TODO_TO_DOING:
      localStorage.setItem('todos',JSON.stringify([
            ...state.slice(0,action.index),{
              todo: state[action.index].todo,
              istodo: false,
              doing: true,
              done: false
            },
            ...state.slice(parseInt(action.index)+1)
            ]));
      return [
                ...state.slice(0,action.index),{
                todo: state[action.index].todo,
                istodo: false,
                doing: true,
                done: false
                },
                ...state.slice(parseInt(action.index)+1) 
            ];
     case CHANGE_DOING_TO_DONE:

       localStorage.setItem('todos',JSON.stringify([
            ...state.slice(0,action.index),{
              todo: state[action.index].todo,
              istodo: false,
              doing: false,
              done: true
            },
            ...state.slice(parseInt(action.index)+1)
            ])); 

        return [
                ...state.slice(0,action.index),{
                todo: state[action.index].todo,
                istodo: false,
                doing: false,
                done: true
                },
                ...state.slice(parseInt(action.index)+1) 
            ];     
    
    case CHANGE_DOING_TO_TODO:
        localStorage.setItem('todos',JSON.stringify([
        ...state.slice(0,action.index),{
          todo: state[action.index].todo,
          istodo: true,
          doing: false,
          done: false
        },
        ...state.slice(parseInt(action.index)+1)
        ]));
      return [
                ...state.slice(0,action.index),{
                todo: state[action.index].todo,
                istodo: true,
                doing: false,
                done: false
                },
                ...state.slice(parseInt(action.index)+1) 
            ];
       
    /*
     * 删除某个事项
     */  
    case DELETE_TODO:
          localStorage.setItem('todos',JSON.stringify([
            ...state.slice(0,action.index),
            ...state.slice(parseInt(action.index)+1)
            ]));
          return [
            ...state.slice(0,action.index),
            ...state.slice(parseInt(action.index) + 1)
          ]

    default:
        return state;
  }
}



export default todolist;