/*
* action 类型
*/
export const ADD_TODO = 'Add_Todo';
export const CHANGE_TODO_TO_DOING = 'Change_TODO_To_Doing';
export const CHANGE_DOING_TO_DONE = 'Change_Doing_To_Done';
export const CHANGE_DONE_TO_DOING = 'Change_Done_To_Doing';
export const CHANGE_DOING_TO_TODO = 'Change_Doing_To_Todo';
export const SEARCH = 'Search';
export const DELETE_TODO = 'Delete_Todo';

/*
 * action 创建函数
 * @method addTodo 添加新事项
 * @param {String} text 添加事项的内容
 */

 export const addTodo = (text) => {
    return (dispatch,getState) => {
      // 测试异步流
      const state = getState();     
      localStorage.setItem('todos',
        JSON.stringify([
          ...state.todolist,{
            todo:text,
            istodo:true,
            doing:false,
            done:false
            }
        ])
      );
      setTimeout(() => {
            dispatch({
                type: ADD_TODO,
                text,
            });
        }, 2);
    }
 }
/*
 * @method search 查找事项
 * @param {String} text 查找事项内容
 */

 export function search(text) {
    return {
        type: SEARCH,
        text,      
    }
 }


/*
 * @method changTodoDoing  状态由todo转为doing
 * @param {Number} index 需要改变状态的事项的下标
 */
 export function changeTodoToDoing(index){
    return {
      type: CHANGE_TODO_TO_DOING,
      index,
    }
 }

/*
 * @method changeDoingToDone 状态由Doing 转为Done
 * @param {Number} index 需要改变状态的事项的下标
 */ 
 export function changeDoingToDone(index){
    return {
      type:CHANGE_DOING_TO_DONE,
      index,
    }
 }
 /*
 * @method changeDoingToDo 状态由Doing 转为Do
 * @param {Number} index 需要改变状态的事项的下标
 */ 
 export function changeDoingToToDo(index){
    return {
      type:CHANGE_DOING_TO_TODO, 
      index,
    }
 }
/*
 * @method deleteTodo 删除事项
 * @param {Number} index 需要删除的事项的下标 
 */
 export function deleteTodo(index){
    return {
      type: DELETE_TODO,
      index,
    }
 }


