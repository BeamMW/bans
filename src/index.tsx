import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
import 'babel-polyfill';

import configureStore from '@app/store/store';
import App from './app';

const { store } = configureStore();

window.global = window;

export default store;

ReactDOM.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  document.getElementById('root'),
);
