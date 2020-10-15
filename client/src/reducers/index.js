import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import taskReducer from './taskReducer';
import alertReducer from './alertReducer';

export default combineReducers({
  auth: authReducer,
  task: taskReducer,
  errors: errorReducer,
  alerts: alertReducer,
});
