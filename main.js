import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';  
import { applyMiddleware } from 'redux';
import ReduxPromise from 'redux-promise';

import App from './components/App';

import appReducer from './reducers/appReducer';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
let store = createStoreWithMiddleware(appReducer);

const root = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
, root);