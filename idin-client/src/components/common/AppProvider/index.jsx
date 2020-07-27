import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'store/configure.store';
import initialState from 'store/initial.state';

const store = configureStore(initialState);

const AppProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);

export default AppProvider;
