import { combineReducers } from 'redux';
import todolist from './todos';

console.log("---todo---",todolist);
const reducer =combineReducers({
   todolist,
})

export default reducer;