import { combineReducers } from 'redux';
import todo from './todo/todoSlice';

const reducers = combineReducers({
  todo,
});

export default reducers;
