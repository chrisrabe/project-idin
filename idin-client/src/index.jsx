import 'typeface-roboto';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ErrorBoundary from 'components/common/ErrorBoundary';
import AppThemeProvider from 'components/common/AppThemeProvider';
import AppProvider from 'components/common/AppProvider';
import App from 'App/container';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ErrorBoundary>
    <AppThemeProvider>
      <AppProvider>
        <App />
      </AppProvider>
    </AppThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
