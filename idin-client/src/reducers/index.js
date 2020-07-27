import { combineReducers } from 'redux';

// child reducers
import homeReducer from 'reducers/home.reducer';

const rootReducer = combineReducers({
  home: homeReducer,
});

export default rootReducer;
