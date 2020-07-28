import { combineReducers } from 'redux';

// child reducers
import homeReducer from 'reducers/home.reducer';
import appReducer from 'reducers/app.reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  app: appReducer,
});

export default rootReducer;
