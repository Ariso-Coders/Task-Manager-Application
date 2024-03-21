import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/query/react';
import { taskApi } from './store/fetures/task-api';
import { setupStore } from './store';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const store = setupStore();
root.render(
  <React.StrictMode>
    <ApiProvider api={taskApi}>
      <BrowserRouter>
        <Provider store={store}>

          <App />
        </Provider>
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
