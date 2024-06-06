import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {store} from './app/store' // מייבאים את ה־Redux store
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.scss'
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
