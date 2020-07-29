import { combineReducers } from 'redux';

// child reducers
import homeReducer from 'reducers/home.reducer';
import appReducer from 'reducers/app.reducer';
import inventoryReducer from 'reducers/inventory.reducer';

const rootReducer = combineReducers({
  home: homeReducer,
  app: appReducer,
  inventory: inventoryReducer,
});

export default rootReducer;
