import * as func from '../function';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state = func.local.get() || {
  event: [],
  count: 0
}

export default {
  state,
  getters,
  actions,
  mutations
}