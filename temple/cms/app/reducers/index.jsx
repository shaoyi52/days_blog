import { combineReducers } from 'redux';
import newslist from './newslist';
import rowFormModal from './rowFormModal';

const reducer = combineReducers({
  newslist,rowFormModal
})

export default reducer;
