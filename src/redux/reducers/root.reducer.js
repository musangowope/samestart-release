import { combineReducers } from 'redux';
import screenOrientationReducer from './screen-orientation.reducer';

export default combineReducers({
  screenOrientationStore: screenOrientationReducer,
});
