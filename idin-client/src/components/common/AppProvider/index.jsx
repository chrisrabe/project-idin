import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'store/configure.store';
import initialState from 'store/initial.state';

const store = configureStore(initialState);

const AppProvider = ({ children }) => (
  <Provider store={store}>
    <BrowserRouter>
      {children}
    </BrowserRouter>
  </Provider>
);

export default AppProvider;
