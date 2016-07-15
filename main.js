import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';  

import App from './components/App';

import appReducer from './reducers/appReducer';

let store = createStore(appReducer);


const root = document.getElementById('app');

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
, root);